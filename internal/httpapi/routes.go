package httpapi

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Controllers bundles every controller RegisterRoutes wires up — the Go
// equivalent of the controllers Laravel would resolve out of its service
// container when building routes/web.php and routes/api.php.
type Controllers struct {
	Profile *ProfileController
	Skills  *SkillsController
	Project *ProjectController
	Contact *ContactController
	Auth    *AuthController
	View    *ViewController // nil if the frontend isn't embedded (e.g. some tests)
}

type RouteDeps struct {
	Controllers Controllers
	UploadsDir  string
	// RequireAdmin guards every /api/admin/* route except login. Nil is
	// only valid in tests that don't exercise the admin surface.
	RequireAdmin gin.HandlerFunc
}

// NewRouter builds the Gin engine and registers every route. The split
// below mirrors a Laravel app's two route files:
//
//   - api routes (routes/api.php equivalent): JSON endpoints under /api,
//     each one dispatching to a controller method.
//   - web routes (routes/web.php equivalent): everything else falls
//     through to ViewController, which renders the SPA shell — Vue Router
//     owns all further client-side navigation from there, the same way a
//     Laravel + Vue SPA app hands off to the frontend router after Blade
//     renders the initial page.
func NewRouter(deps RouteDeps) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), requestLogger())

	registerAPIRoutes(r, deps.Controllers, deps.RequireAdmin)

	// Admin-uploaded content (profile photo, CV, project screenshots) is
	// served directly, not routed through a controller — the same role
	// Laravel's storage/ symlink into public/ plays.
	r.StaticFS("/uploads", http.Dir(deps.UploadsDir))

	registerWebRoutes(r, deps.Controllers)

	return r
}

// registerAPIRoutes is the routes/api.php equivalent: JSON resource
// endpoints, one line per route just like Laravel's Route::get/post.
func registerAPIRoutes(r *gin.Engine, ctl Controllers, requireAdmin gin.HandlerFunc) {
	api := r.Group("/api")
	{
		api.GET("/profile", ctl.Profile.Show)
		api.GET("/skills", ctl.Skills.Index)
		api.GET("/projects", ctl.Project.Index)
		api.GET("/projects/:id", ctl.Project.Show)
		api.POST("/contact", ctl.Contact.Store)

		admin := api.Group("/admin")
		{
			admin.POST("/login", ctl.Auth.Login)
			admin.POST("/logout", ctl.Auth.Logout)
			admin.GET("/me", requireAdmin, ctl.Auth.Me)
			// Admin CRUD routes (projects/skills/profile management,
			// contact submissions) are added here as the admin panel
			// is built — each behind requireAdmin, same pattern as /me.
		}
	}
}

// registerWebRoutes is the routes/web.php equivalent. Every non-API path —
// known ones like "/" and future ones the frontend adds on its own, e.g.
// "/admin/projects/3/edit" — is unmatched by any Gin route, so Gin's
// NoRoute hook is where the catch-all view route lives:
//
//	Route::get('/{any}', [ViewController::class, 'index'])->where('any', '.*');
func registerWebRoutes(r *gin.Engine, ctl Controllers) {
	if ctl.View == nil {
		return
	}
	r.NoRoute(ctl.View.Index)
}

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		log.Printf("%s %s %s", c.Request.Method, c.Request.URL.Path, time.Since(start))
	}
}
