// Package public embeds the built frontend (produced by `pnpm build`,
// which writes to public/build/) into the compiled Go binary, so the
// server ships as a single self-contained executable.
package public

import (
	"embed"
	"io/fs"
)

//go:embed all:build
var buildFS embed.FS

// Dist returns the embedded frontend build output rooted at "build",
// so callers can serve it directly as the site root (e.g. "/index.html"
// instead of "/build/index.html").
func Dist() fs.FS {
	sub, err := fs.Sub(buildFS, "build")
	if err != nil {
		panic(err)
	}
	return sub
}
