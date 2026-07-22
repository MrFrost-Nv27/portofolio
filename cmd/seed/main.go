package main

import (
	"bufio"
	"context"
	"database/sql"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/term"

	"portofolio/internal/auth"
	"portofolio/internal/config"
	"portofolio/internal/db"
	"portofolio/internal/models"
	"portofolio/internal/repository"
	"portofolio/internal/seed"
)

func main() {
	createAdmin := flag.Bool("create-admin", false, "create the single admin user instead of seeding content")
	adminUsername := flag.String("username", "admin", "admin username (used with -create-admin)")
	assetsDir := flag.String("assets-dir", "assets", "path to the legacy assets/ directory to copy images/CV from")
	flag.Parse()

	cfg := config.Load()
	ctx := context.Background()

	conn, err := db.Open(cfg.DBPath)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer conn.Close()

	if err := db.RunMigrations(conn); err != nil {
		log.Fatalf("run migrations: %v", err)
	}

	if *createAdmin {
		runCreateAdmin(ctx, conn, *adminUsername)
		return
	}

	runSeedContent(ctx, conn, cfg, *assetsDir)
}

func runSeedContent(ctx context.Context, conn *sql.DB, cfg config.Config, assetsDir string) {
	profileRepo := repository.NewProfileRepo(conn)
	skillsRepo := repository.NewSkillsRepo(conn)
	projectsRepo := repository.NewProjectsRepo(conn)

	exists, err := profileRepo.Exists(ctx)
	if err != nil {
		log.Fatalf("check existing profile: %v", err)
	}
	if exists {
		log.Println("profile already seeded — aborting (seed is idempotent, run only once)")
		return
	}

	if err := os.MkdirAll(cfg.UploadsDir, 0o755); err != nil {
		log.Fatalf("create uploads dir: %v", err)
	}

	// ── Profile + assets ────────────────────────────────────────
	profile := seed.ProfileData

	if photoPath, err := copyAsset(assetsDir, "images/pasfoto.png", cfg.UploadsDir, "images/profile", "pasfoto.png"); err != nil {
		log.Printf("warning: could not copy profile photo: %v", err)
	} else {
		profile.PhotoPath = "/uploads/" + photoPath
	}

	if cvPath, err := copyAsset(assetsDir, "cv.pdf", cfg.UploadsDir, "cv", "cv.pdf"); err != nil {
		log.Printf("warning: could not copy CV: %v", err)
	} else {
		profile.CVPath = "/uploads/" + cvPath
	}

	if err := profileRepo.Upsert(ctx, &profile); err != nil {
		log.Fatalf("seed profile: %v", err)
	}
	log.Println("seeded profile")

	// ── Skills ───────────────────────────────────────────────────
	chipCount := 0
	for i, cat := range seed.SkillCategoriesData {
		catID, err := skillsRepo.CreateCategory(ctx, &models.SkillCategory{
			NameID:    cat.NameID,
			NameEn:    cat.NameEn,
			SortOrder: i,
		})
		if err != nil {
			log.Fatalf("seed skill category %q: %v", cat.NameID, err)
		}
		for j, label := range cat.Chips {
			if _, err := skillsRepo.CreateChip(ctx, &models.SkillChip{
				CategoryID: catID,
				Label:      label,
				SortOrder:  j,
			}); err != nil {
				log.Fatalf("seed skill chip %q: %v", label, err)
			}
			chipCount++
		}
	}
	log.Printf("seeded %d skill categories, %d chips", len(seed.SkillCategoriesData), chipCount)

	// ── Projects ─────────────────────────────────────────────────
	imageCount := 0
	for i, p := range seed.ProjectsData {
		project := models.Project{
			TitleID:       p.TitleID,
			TitleEn:       p.TitleEn,
			Category:      p.Category,
			DescriptionID: p.DescriptionID,
			DescriptionEn: p.DescriptionEn,
			Tags:          p.Tags,
			URLDemo:       p.URLDemo,
			URLRepo:       p.URLRepo,
			SortOrder:     i,
			Published:     true,
		}

		projectID, err := projectsRepo.Create(ctx, &project)
		if err != nil {
			log.Fatalf("seed project %q: %v", p.TitleID, err)
		}

		if len(p.Images) == 0 {
			continue
		}

		projectSubDir := fmt.Sprintf("images/projects/%d", projectID)
		var heroUploadPath string
		for sortOrder, srcRelPath := range p.Images {
			filename := filepath.Base(srcRelPath)
			// srcRelPath is like "assets/images/livechat/l1.png"; strip the leading "assets/"
			srcRelToAssetsDir := strings.TrimPrefix(srcRelPath, "assets/")

			uploadRelPath, err := copyAsset(assetsDir, srcRelToAssetsDir, cfg.UploadsDir, projectSubDir, filename)
			if err != nil {
				log.Printf("warning: could not copy image %q for project %q: %v", srcRelPath, p.TitleID, err)
				continue
			}
			uploadPath := "/uploads/" + uploadRelPath
			if srcRelPath == p.Hero {
				heroUploadPath = uploadPath
			}
			if _, err := projectsRepo.AddImage(ctx, &models.ProjectImage{
				ProjectID: projectID,
				ImagePath: uploadPath,
				SortOrder: sortOrder,
			}); err != nil {
				log.Fatalf("seed project image for %q: %v", p.TitleID, err)
			}
			imageCount++
		}

		if heroUploadPath != "" {
			project.ID = projectID
			project.HeroImagePath = heroUploadPath
			if err := projectsRepo.Update(ctx, &project); err != nil {
				log.Fatalf("set hero image for %q: %v", p.TitleID, err)
			}
		}
	}
	log.Printf("seeded %d projects, %d gallery images", len(seed.ProjectsData), imageCount)

	log.Println("seed complete — verify row counts above against the legacy site before trusting this migration")
}

func runCreateAdmin(ctx context.Context, conn *sql.DB, username string) {
	authRepo := repository.NewAuthRepo(conn)

	exists, err := authRepo.AnyUserExists(ctx)
	if err != nil {
		log.Fatalf("check existing admin users: %v", err)
	}
	if exists {
		log.Println("an admin user already exists — aborting (only a single admin user is supported)")
		return
	}

	password := os.Getenv("ADMIN_INITIAL_PASSWORD")
	if password == "" {
		password = promptPassword()
	}
	if len(password) < 8 {
		log.Fatal("password must be at least 8 characters")
	}

	hash, err := auth.HashPassword(password)
	if err != nil {
		log.Fatalf("hash password: %v", err)
	}

	if _, err := authRepo.CreateUser(ctx, username, hash); err != nil {
		log.Fatalf("create admin user: %v", err)
	}
	log.Printf("created admin user %q", username)
}

func promptPassword() string {
	fmt.Fprint(os.Stderr, "Set initial admin password: ")
	fd := int(os.Stdin.Fd())
	if term.IsTerminal(fd) {
		b, err := term.ReadPassword(fd)
		fmt.Fprintln(os.Stderr)
		if err != nil {
			log.Fatalf("read password: %v", err)
		}
		return string(b)
	}
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && err != io.EOF {
		log.Fatalf("read password: %v", err)
	}
	return strings.TrimRight(line, "\r\n")
}

// copyAsset copies assetsDir/srcRelPath to uploadsDir/destSubDir/destFilename,
// creating destSubDir if needed, and returns the copied file's path relative
// to uploadsDir (e.g. "images/projects/3/l1.png") for building "/uploads/..." URLs.
func copyAsset(assetsDir, srcRelPath, uploadsDir, destSubDir, destFilename string) (string, error) {
	srcPath := filepath.Join(assetsDir, srcRelPath)
	src, err := os.Open(srcPath)
	if err != nil {
		return "", fmt.Errorf("open source asset %s: %w", srcPath, err)
	}
	defer src.Close()

	destDir := filepath.Join(uploadsDir, destSubDir)
	if err := os.MkdirAll(destDir, 0o755); err != nil {
		return "", fmt.Errorf("create dest dir %s: %w", destDir, err)
	}

	destPath := filepath.Join(destDir, destFilename)
	dst, err := os.Create(destPath)
	if err != nil {
		return "", fmt.Errorf("create dest asset %s: %w", destPath, err)
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		return "", fmt.Errorf("copy asset %s -> %s: %w", srcPath, destPath, err)
	}

	return filepath.ToSlash(filepath.Join(destSubDir, destFilename)), nil
}
