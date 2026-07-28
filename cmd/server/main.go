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
	authRepo := repository.NewAuthRepo(gdb)

	controllers := httpapi.Controllers{
		Profile: httpapi.NewProfileController(profileRepo),
		Skills:  httpapi.NewSkillsController(skillsRepo),
		Project: httpapi.NewProjectController(projectsRepo),
		Contact: httpapi.NewContactController(contactRepo),
		Auth:    httpapi.NewAuthController(authRepo, cfg.SessionCookieSecure),
		View:    httpapi.NewViewController(public.Dist()),
	}

	r := httpapi.NewRouter(httpapi.RouteDeps{
		Controllers:  controllers,
		UploadsDir:   cfg.UploadsDir,
		RequireAdmin: httpapi.RequireAdminAuth(authRepo),
	})

	addr := ":" + cfg.Port
	log.Printf("listening on %s (driver=%s, uploads=%s)", addr, cfg.DBDriver, cfg.UploadsDir)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
