package main

import (
	"log"
	"os"

	"portofolio/internal/config"
	"portofolio/internal/db"
	"portofolio/internal/httpapi"
	"portofolio/internal/repository"
	"portofolio/public"
)

func main() {
	cfg := config.Load()

	gdb, err := db.Open(cfg)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}

	if err := db.Migrate(gdb); err != nil {
		log.Fatalf("run migrations: %v", err)
	}

	if err := os.MkdirAll(cfg.UploadsDir, 0o755); err != nil {
		log.Fatalf("create uploads dir: %v", err)
	}

	profileRepo := repository.NewProfileRepo(gdb)
	skillsRepo := repository.NewSkillsRepo(gdb)
	projectsRepo := repository.NewProjectsRepo(gdb)
	contactRepo := repository.NewContactRepo(gdb)

	publicHandlers := httpapi.NewPublicHandlers(profileRepo, skillsRepo, projectsRepo, contactRepo)

	r := httpapi.NewRouter(httpapi.RouterDeps{
		Public:     publicHandlers,
		UploadsDir: cfg.UploadsDir,
		Frontend:   public.Dist(),
	})

	addr := ":" + cfg.Port
	log.Printf("listening on %s (driver=%s, uploads=%s)", addr, cfg.DBDriver, cfg.UploadsDir)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
