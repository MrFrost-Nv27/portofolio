package repository

import (
	"context"
	"database/sql"
	"path/filepath"
	"testing"
	"time"

	"portofolio/internal/db"
	"portofolio/internal/models"
)

func newTestDB(t *testing.T) *sql.DB {
	t.Helper()
	dbPath := filepath.Join(t.TempDir(), "test.db")
	conn, err := db.Open(dbPath)
	if err != nil {
		t.Fatalf("open test db: %v", err)
	}
	if err := db.RunMigrations(conn); err != nil {
		t.Fatalf("run migrations: %v", err)
	}
	t.Cleanup(func() { conn.Close() })
	return conn
}

func TestMigrationsIdempotent(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "test.db")
	conn, err := db.Open(dbPath)
	if err != nil {
		t.Fatalf("open test db: %v", err)
	}
	defer conn.Close()

	if err := db.RunMigrations(conn); err != nil {
		t.Fatalf("first migration run: %v", err)
	}
	if err := db.RunMigrations(conn); err != nil {
		t.Fatalf("second migration run should be a no-op, got error: %v", err)
	}
}

func TestProfileUpsertAndGet(t *testing.T) {
	conn := newTestDB(t)
	repo := NewProfileRepo(conn)
	ctx := context.Background()

	exists, err := repo.Exists(ctx)
	if err != nil {
		t.Fatalf("exists: %v", err)
	}
	if exists {
		t.Fatal("expected no profile in a fresh db")
	}

	p := &models.Profile{
		Name: "Test User", RoleID: "Dev", RoleEn: "Dev",
		BioP1ID: "a", BioP2ID: "b", BioP1En: "c", BioP2En: "d",
		Email: "t@example.com", WhatsappNumber: "123",
		ExperienceSinceYear: 2020, ProjectsCompleted: 10, LanguagesCount: 3,
	}
	if err := repo.Upsert(ctx, p); err != nil {
		t.Fatalf("upsert: %v", err)
	}

	got, err := repo.Get(ctx)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got.Name != "Test User" || got.Email != "t@example.com" {
		t.Fatalf("unexpected profile: %+v", got)
	}

	p.Name = "Updated Name"
	if err := repo.Upsert(ctx, p); err != nil {
		t.Fatalf("second upsert: %v", err)
	}
	got, err = repo.Get(ctx)
	if err != nil {
		t.Fatalf("get after update: %v", err)
	}
	if got.Name != "Updated Name" {
		t.Fatalf("expected updated name, got %q", got.Name)
	}
}

// TestSkillsListCategoriesAttachesChipsToEveryCategory guards against a
// regression where taking &categories[i] while still appending to the same
// slice (before it stopped growing) orphaned chips from earlier categories
// once append reallocated the backing array.
func TestSkillsListCategoriesAttachesChipsToEveryCategory(t *testing.T) {
	conn := newTestDB(t)
	repo := NewSkillsRepo(conn)
	ctx := context.Background()

	catNames := []string{"Frontend", "Backend", "AI", "Tools"}
	for i, name := range catNames {
		catID, err := repo.CreateCategory(ctx, &models.SkillCategory{NameID: name, NameEn: name, SortOrder: i})
		if err != nil {
			t.Fatalf("create category %s: %v", name, err)
		}
		if _, err := repo.CreateChip(ctx, &models.SkillChip{CategoryID: catID, Label: name + "-chip", SortOrder: 0}); err != nil {
			t.Fatalf("create chip for %s: %v", name, err)
		}
	}

	categories, err := repo.ListCategories(ctx)
	if err != nil {
		t.Fatalf("list categories: %v", err)
	}
	if len(categories) != len(catNames) {
		t.Fatalf("expected %d categories, got %d", len(catNames), len(categories))
	}
	for _, c := range categories {
		if len(c.Chips) != 1 {
			t.Errorf("category %q: expected 1 chip, got %d", c.NameID, len(c.Chips))
		}
	}
}

func TestProjectsCreateGetListAndImages(t *testing.T) {
	conn := newTestDB(t)
	repo := NewProjectsRepo(conn)
	ctx := context.Background()

	p := &models.Project{
		TitleID: "Judul", TitleEn: "Title", Category: "Web App",
		DescriptionID: "desc id", DescriptionEn: "desc en",
		Tags: []string{"Go", "SQLite"}, Published: true,
	}
	id, err := repo.Create(ctx, p)
	if err != nil {
		t.Fatalf("create project: %v", err)
	}

	if _, err := repo.AddImage(ctx, &models.ProjectImage{ProjectID: id, ImagePath: "/uploads/x.png", SortOrder: 0}); err != nil {
		t.Fatalf("add image: %v", err)
	}

	got, err := repo.Get(ctx, id)
	if err != nil {
		t.Fatalf("get project: %v", err)
	}
	if len(got.Tags) != 2 || got.Tags[0] != "Go" {
		t.Fatalf("unexpected tags: %v", got.Tags)
	}
	if len(got.Images) != 1 {
		t.Fatalf("expected 1 image, got %d", len(got.Images))
	}

	list, err := repo.List(ctx, ProjectFilter{PublishedOnly: true, Category: "Web App"})
	if err != nil {
		t.Fatalf("list projects: %v", err)
	}
	if len(list) != 1 {
		t.Fatalf("expected 1 published Web App project, got %d", len(list))
	}

	unpublished, err := repo.List(ctx, ProjectFilter{PublishedOnly: true, Category: "Mobile"})
	if err != nil {
		t.Fatalf("list mobile projects: %v", err)
	}
	if len(unpublished) != 0 {
		t.Fatalf("expected 0 Mobile projects, got %d", len(unpublished))
	}

	if err := repo.Delete(ctx, id); err != nil {
		t.Fatalf("delete project: %v", err)
	}
	if _, err := repo.Get(ctx, id); err == nil {
		t.Fatal("expected error getting deleted project")
	}
}

func TestContactRepoCreateAndList(t *testing.T) {
	conn := newTestDB(t)
	repo := NewContactRepo(conn)
	ctx := context.Background()

	if _, err := repo.Create(ctx, &models.ContactSubmission{
		Name: "A", Service: "Web", Message: "hi", Locale: "id",
	}); err != nil {
		t.Fatalf("create submission: %v", err)
	}

	submissions, total, err := repo.List(ctx, 1, 20)
	if err != nil {
		t.Fatalf("list submissions: %v", err)
	}
	if total != 1 || len(submissions) != 1 {
		t.Fatalf("expected 1 submission, got total=%d len=%d", total, len(submissions))
	}
}

func TestAuthRepoUserAndSession(t *testing.T) {
	conn := newTestDB(t)
	repo := NewAuthRepo(conn)
	ctx := context.Background()

	exists, err := repo.AnyUserExists(ctx)
	if err != nil {
		t.Fatalf("any user exists: %v", err)
	}
	if exists {
		t.Fatal("expected no admin users in fresh db")
	}

	userID, err := repo.CreateUser(ctx, "admin", "hashed")
	if err != nil {
		t.Fatalf("create user: %v", err)
	}

	if err := repo.CreateSession(ctx, "tok123", userID, time.Now().Add(time.Hour)); err != nil {
		t.Fatalf("create session: %v", err)
	}

	u, err := repo.GetSessionUser(ctx, "tok123")
	if err != nil {
		t.Fatalf("get session user: %v", err)
	}
	if u.Username != "admin" {
		t.Fatalf("expected username admin, got %q", u.Username)
	}

	if err := repo.DeleteSession(ctx, "tok123"); err != nil {
		t.Fatalf("delete session: %v", err)
	}
	if _, err := repo.GetSessionUser(ctx, "tok123"); err == nil {
		t.Fatal("expected error looking up deleted session")
	}
}
