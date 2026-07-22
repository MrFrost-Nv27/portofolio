package repository

import (
	"context"
	"database/sql"
	"fmt"

	"portofolio/internal/models"
)

type ProfileRepo struct {
	db *sql.DB
}

func NewProfileRepo(db *sql.DB) *ProfileRepo {
	return &ProfileRepo{db: db}
}

func (r *ProfileRepo) Get(ctx context.Context) (*models.Profile, error) {
	row := r.db.QueryRowContext(ctx, `
		SELECT name, role_id, role_en, bio_p1_id, bio_p2_id, bio_p1_en, bio_p2_en,
		       COALESCE(photo_path, ''), COALESCE(cv_path, ''), email, whatsapp_number, COALESCE(address, ''),
		       experience_since_year, projects_completed, languages_count,
		       COALESCE(github_url, ''), COALESCE(gitlab_url, ''), COALESCE(linkedin_url, ''), COALESCE(instagram_url, '')
		FROM profile WHERE id = 1
	`)

	var p models.Profile
	err := row.Scan(
		&p.Name, &p.RoleID, &p.RoleEn, &p.BioP1ID, &p.BioP2ID, &p.BioP1En, &p.BioP2En,
		&p.PhotoPath, &p.CVPath, &p.Email, &p.WhatsappNumber, &p.Address,
		&p.ExperienceSinceYear, &p.ProjectsCompleted, &p.LanguagesCount,
		&p.GithubURL, &p.GitlabURL, &p.LinkedinURL, &p.InstagramURL,
	)
	if err != nil {
		return nil, fmt.Errorf("get profile: %w", err)
	}
	return &p, nil
}

func (r *ProfileRepo) Upsert(ctx context.Context, p *models.Profile) error {
	_, err := r.db.ExecContext(ctx, `
		INSERT INTO profile (
			id, name, role_id, role_en, bio_p1_id, bio_p2_id, bio_p1_en, bio_p2_en,
			photo_path, cv_path, email, whatsapp_number, address,
			experience_since_year, projects_completed, languages_count,
			github_url, gitlab_url, linkedin_url, instagram_url, updated_at
		) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
		ON CONFLICT(id) DO UPDATE SET
			name = excluded.name, role_id = excluded.role_id, role_en = excluded.role_en,
			bio_p1_id = excluded.bio_p1_id, bio_p2_id = excluded.bio_p2_id,
			bio_p1_en = excluded.bio_p1_en, bio_p2_en = excluded.bio_p2_en,
			photo_path = excluded.photo_path, cv_path = excluded.cv_path,
			email = excluded.email, whatsapp_number = excluded.whatsapp_number, address = excluded.address,
			experience_since_year = excluded.experience_since_year,
			projects_completed = excluded.projects_completed, languages_count = excluded.languages_count,
			github_url = excluded.github_url, gitlab_url = excluded.gitlab_url,
			linkedin_url = excluded.linkedin_url, instagram_url = excluded.instagram_url,
			updated_at = CURRENT_TIMESTAMP
	`,
		p.Name, p.RoleID, p.RoleEn, p.BioP1ID, p.BioP2ID, p.BioP1En, p.BioP2En,
		nullable(p.PhotoPath), nullable(p.CVPath), p.Email, p.WhatsappNumber, nullable(p.Address),
		p.ExperienceSinceYear, p.ProjectsCompleted, p.LanguagesCount,
		nullable(p.GithubURL), nullable(p.GitlabURL), nullable(p.LinkedinURL), nullable(p.InstagramURL),
	)
	if err != nil {
		return fmt.Errorf("upsert profile: %w", err)
	}
	return nil
}

func (r *ProfileRepo) Exists(ctx context.Context) (bool, error) {
	var count int
	if err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM profile WHERE id = 1`).Scan(&count); err != nil {
		return false, fmt.Errorf("check profile exists: %w", err)
	}
	return count > 0, nil
}

func nullable(s string) any {
	if s == "" {
		return nil
	}
	return s
}
