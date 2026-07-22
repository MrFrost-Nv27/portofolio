package httpapi

import (
	"errors"
	"io/fs"
	"log"
	"net/http"
	"strings"
	"time"
)

type RouterDeps struct {
	Public     *PublicHandlers
	UploadsDir string
	// Frontend is the embedded, built Vue SPA (public.Dist()). Nil in tests
	// that don't care about serving it.
	Frontend fs.FS
}

// NewRouter builds the HTTP mux for the API + uploads static files, and
// (if provided) mounts the embedded frontend as a SPA catch-all so the
// whole app ships as one binary. Admin routes (Phase C) are added on top
// of this router as the project progresses.
func NewRouter(deps RouterDeps) *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/profile", deps.Public.GetProfile)
	mux.HandleFunc("GET /api/skills", deps.Public.ListSkills)
	mux.HandleFunc("GET /api/projects", deps.Public.ListProjects)
	mux.HandleFunc("GET /api/projects/{id}", deps.Public.GetProject)
	mux.HandleFunc("POST /api/contact", deps.Public.SubmitContact)

	uploadsFS := http.FileServer(http.Dir(deps.UploadsDir))
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", uploadsFS))

	if deps.Frontend != nil {
		mux.Handle("GET /", spaHandler(deps.Frontend))
	}

	return mux
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
func spaHandler(frontend fs.FS) http.Handler {
	fileServer := http.FileServer(http.FS(frontend))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cleanPath := strings.TrimPrefix(r.URL.Path, "/")
		if cleanPath == "" {
			cleanPath = "index.html"
		}
		if _, err := fs.Stat(frontend, cleanPath); errors.Is(err, fs.ErrNotExist) {
			serveIndex(w, frontend)
			return
		}
		fileServer.ServeHTTP(w, r)
	})
}

func serveIndex(w http.ResponseWriter, frontend fs.FS) {
	data, err := fs.ReadFile(frontend, "index.html")
	if err != nil {
		http.Error(w, "index.html not found in embedded frontend build", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(data)
}

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
	})
}

func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				writeError(w, http.StatusInternalServerError, "internal server error")
			}
		}()
		next.ServeHTTP(w, r)
	})
}
