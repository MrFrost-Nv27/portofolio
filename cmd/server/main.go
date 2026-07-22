package main

import (
	"log"
	"net/http"
	"os"

	"portofolio/internal/config"
	"portofolio/internal/db"
	"portofolio/internal/httpapi"
	"portofolio/internal/repository"
	"portofolio/public"
)

func main() {
	cfg := config.Load()

	conn, err := db.Open(cfg.DBPath)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer conn.Close()

	if err := db.RunMigrations(conn); err != nil {
		log.Fatalf("run migrations: %v", err)
	}

	if err := os.MkdirAll(cfg.UploadsDir, 0o755); err != nil {
		log.Fatalf("create uploads dir: %v", err)
	}

	profileRepo := repository.NewProfileRepo(conn)
	skillsRepo := repository.NewSkillsRepo(conn)
	projectsRepo := repository.NewProjectsRepo(conn)
	contactRepo := repository.NewContactRepo(conn)

	publicHandlers := httpapi.NewPublicHandlers(profileRepo, skillsRepo, projectsRepo, contactRepo)

	mux := httpapi.NewRouter(httpapi.RouterDeps{
		Public:     publicHandlers,
		UploadsDir: cfg.UploadsDir,
		Frontend:   public.Dist(),
	})

	handler := httpapi.Recover(httpapi.Logging(mux))

	addr := ":" + cfg.Port
	log.Printf("listening on %s (db=%s, uploads=%s)", addr, cfg.DBPath, cfg.UploadsDir)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
