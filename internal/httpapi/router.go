package httpapi

import (
	"errors"
	"io/fs"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type RouterDeps struct {
	Public     *PublicHandlers
	UploadsDir string
	// Frontend is the embedded, built Vue SPA (public.Dist()). Nil in tests
	// that don't care about serving it.
	Frontend fs.FS
}

// NewRouter builds the Gin engine for the API + uploads static files, and
// (if provided) mounts the embedded frontend as a SPA catch-all so the
// whole app ships as one binary. Admin routes (Phase C) are added on top
// of this router as the project progresses.
func NewRouter(deps RouterDeps) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), requestLogger())

	api := r.Group("/api")
	{
		api.GET("/profile", deps.Public.GetProfile)
		api.GET("/skills", deps.Public.ListSkills)
		api.GET("/projects", deps.Public.ListProjects)
		api.GET("/projects/:id", deps.Public.GetProject)
		api.POST("/contact", deps.Public.SubmitContact)
	}

	r.StaticFS("/uploads", http.Dir(deps.UploadsDir))

	if deps.Frontend != nil {
		r.NoRoute(spaHandler(deps.Frontend))
	}

	return r
}

// spaHandler serves static files from the embedded frontend build, falling
// back to index.html for any path that isn't a real file — required so
// Vue Router's client-side routes (e.g. /admin/projects/3/edit) work on a
// hard refresh instead of 404ing.
//
// The fallback reads index.html directly rather than rewriting the request
// and delegating to http.FileServer: net/http's file server special-cases
// any request whose path ends in "/index.html" and issues a redirect to
// "./" to canonicalize directory URLs, which turns every SPA route into a
// redirect loop instead of serving the app shell.
func spaHandler(frontend fs.FS) gin.HandlerFunc {
	fileServer := http.FileServer(http.FS(frontend))
	return func(c *gin.Context) {
		cleanPath := strings.TrimPrefix(c.Request.URL.Path, "/")
		if cleanPath == "" {
			cleanPath = "index.html"
		}
		if _, err := fs.Stat(frontend, cleanPath); errors.Is(err, fs.ErrNotExist) {
			serveIndex(c, frontend)
			return
		}
		fileServer.ServeHTTP(c.Writer, c.Request)
	}
}

func serveIndex(c *gin.Context, frontend fs.FS) {
	data, err := fs.ReadFile(frontend, "index.html")
	if err != nil {
		c.String(http.StatusInternalServerError, "index.html not found in embedded frontend build")
		return
	}
	c.Data(http.StatusOK, "text/html; charset=utf-8", data)
}

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		log.Printf("%s %s %s", c.Request.Method, c.Request.URL.Path, time.Since(start))
	}
}
