package httpapi

import (
	"errors"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// ViewController renders the embedded Vue SPA shell. It plays the same role
// as Laravel's catch-all view route —
//
//	Route::get('/{any}', [ViewController::class, 'index'])->where('any', '.*');
//
// — for everything that isn't an API route: Go decides what to serve for a
// request, and for any "page" URL (including ones Go itself has never heard
// of, like /admin/projects/3/edit) the answer is always the same HTML shell.
// Vue Router then takes over client-side routing from there.
//
// Real static build assets (JS/CSS bundles, favicon, etc.) are served as-is
// when the path matches an actual embedded file; Laravel gets this for free
// because its web server serves public/ directly before PHP ever runs, but
// Go has no such split, so this controller does both jobs.
type ViewController struct {
	frontend   fs.FS
	fileServer http.Handler
}

func NewViewController(frontend fs.FS) *ViewController {
	return &ViewController{
		frontend:   frontend,
		fileServer: http.FileServer(http.FS(frontend)),
	}
}

// Index handles the catch-all "web" route (see routes.go).
func (ctl *ViewController) Index(c *gin.Context) {
	cleanPath := strings.TrimPrefix(c.Request.URL.Path, "/")
	if cleanPath == "" {
		cleanPath = "index.html"
	}

	if _, err := fs.Stat(ctl.frontend, cleanPath); errors.Is(err, fs.ErrNotExist) {
		ctl.renderShell(c)
		return
	}
	ctl.fileServer.ServeHTTP(c.Writer, c.Request)
}

// renderShell reads index.html directly rather than delegating to
// http.FileServer for it: net/http's file server special-cases any request
// whose path ends in "/index.html" and issues a redirect to "./" to
// canonicalize directory URLs, which turns every SPA route into a redirect
// loop instead of serving the app shell.
func (ctl *ViewController) renderShell(c *gin.Context) {
	data, err := fs.ReadFile(ctl.frontend, "index.html")
	if err != nil {
		c.String(http.StatusInternalServerError, "index.html not found in embedded frontend build")
		return
	}
	c.Data(http.StatusOK, "text/html; charset=utf-8", data)
}
