package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	"portofolio/internal/models"
)

type ProjectsRepo struct {
	db *sql.DB
}

func NewProjectsRepo(db *sql.DB) *ProjectsRepo {
	return &ProjectsRepo{db: db}
}

type ProjectFilter struct {
	Category       string
	PublishedOnly  bool
	IncludeGallery bool
}

func (r *ProjectsRepo) List(ctx context.Context, filter ProjectFilter) ([]models.Project, error) {
	query := `
		SELECT id, title_id, title_en, category, description_id, description_en, tags,
		       COALESCE(url_demo, ''), COALESCE(url_repo, ''), COALESCE(hero_image_path, ''),
		       sort_order, published, created_at, updated_at
		FROM projects WHERE 1 = 1
	`
	var args []any
	if filter.PublishedOnly {
		query += ` AND published = 1`
	}
	if filter.Category != "" {
		query += ` AND category = ?`
		args = append(args, filter.Category)
	}
	query += ` ORDER BY sort_order, id`

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("list projects: %w", err)
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		var tagsJSON string
		if err := rows.Scan(&p.ID, &p.TitleID, &p.TitleEn, &p.Category, &p.DescriptionID, &p.DescriptionEn,
			&tagsJSON, &p.URLDemo, &p.URLRepo, &p.HeroImagePath, &p.SortOrder, &p.Published,
			&p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan project: %w", err)
		}
		p.Tags = decodeTags(tagsJSON)
		p.Images = []models.ProjectImage{}
		projects = append(projects, p)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	if filter.IncludeGallery {
		for i := range projects {
			images, err := r.imagesForProject(ctx, projects[i].ID)
			if err != nil {
				return nil, err
			}
			projects[i].Images = images
		}
	}

	return projects, nil
}

func (r *ProjectsRepo) Get(ctx context.Context, id int64) (*models.Project, error) {
	row := r.db.QueryRowContext(ctx, `
		SELECT id, title_id, title_en, category, description_id, description_en, tags,
		       COALESCE(url_demo, ''), COALESCE(url_repo, ''), COALESCE(hero_image_path, ''),
		       sort_order, published, created_at, updated_at
		FROM projects WHERE id = ?
	`, id)

	var p models.Project
	var tagsJSON string
	if err := row.Scan(&p.ID, &p.TitleID, &p.TitleEn, &p.Category, &p.DescriptionID, &p.DescriptionEn,
		&tagsJSON, &p.URLDemo, &p.URLRepo, &p.HeroImagePath, &p.SortOrder, &p.Published,
		&p.CreatedAt, &p.UpdatedAt); err != nil {
		return nil, fmt.Errorf("get project: %w", err)
	}
	p.Tags = decodeTags(tagsJSON)

	images, err := r.imagesForProject(ctx, p.ID)
	if err != nil {
		return nil, err
	}
	p.Images = images

	return &p, nil
}

func (r *ProjectsRepo) imagesForProject(ctx context.Context, projectID int64) ([]models.ProjectImage, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, project_id, image_path, sort_order FROM project_images
		WHERE project_id = ? ORDER BY sort_order, id
	`, projectID)
	if err != nil {
		return nil, fmt.Errorf("list project images: %w", err)
	}
	defer rows.Close()

	images := []models.ProjectImage{}
	for rows.Next() {
		var img models.ProjectImage
		if err := rows.Scan(&img.ID, &img.ProjectID, &img.ImagePath, &img.SortOrder); err != nil {
			return nil, fmt.Errorf("scan project image: %w", err)
		}
		images = append(images, img)
	}
	return images, rows.Err()
}

func (r *ProjectsRepo) Create(ctx context.Context, p *models.Project) (int64, error) {
	tagsJSON, err := json.Marshal(p.Tags)
	if err != nil {
		return 0, fmt.Errorf("marshal tags: %w", err)
	}
	res, err := r.db.ExecContext(ctx, `
		INSERT INTO projects (title_id, title_en, category, description_id, description_en, tags,
		                       url_demo, url_repo, hero_image_path, sort_order, published)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, p.TitleID, p.TitleEn, p.Category, p.DescriptionID, p.DescriptionEn, string(tagsJSON),
		nullable(p.URLDemo), nullable(p.URLRepo), nullable(p.HeroImagePath), p.SortOrder, p.Published)
	if err != nil {
		return 0, fmt.Errorf("create project: %w", err)
	}
	return res.LastInsertId()
}

func (r *ProjectsRepo) Update(ctx context.Context, p *models.Project) error {
	tagsJSON, err := json.Marshal(p.Tags)
	if err != nil {
		return fmt.Errorf("marshal tags: %w", err)
	}
	_, err = r.db.ExecContext(ctx, `
		UPDATE projects SET title_id = ?, title_en = ?, category = ?, description_id = ?, description_en = ?,
		       tags = ?, url_demo = ?, url_repo = ?, hero_image_path = ?, sort_order = ?, published = ?,
		       updated_at = CURRENT_TIMESTAMP
		WHERE id = ?
	`, p.TitleID, p.TitleEn, p.Category, p.DescriptionID, p.DescriptionEn, string(tagsJSON),
		nullable(p.URLDemo), nullable(p.URLRepo), nullable(p.HeroImagePath), p.SortOrder, p.Published, p.ID)
	if err != nil {
		return fmt.Errorf("update project: %w", err)
	}
	return nil
}

func (r *ProjectsRepo) Delete(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM projects WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("delete project: %w", err)
	}
	return nil
}

func (r *ProjectsRepo) AddImage(ctx context.Context, img *models.ProjectImage) (int64, error) {
	res, err := r.db.ExecContext(ctx,
		`INSERT INTO project_images (project_id, image_path, sort_order) VALUES (?, ?, ?)`,
		img.ProjectID, img.ImagePath, img.SortOrder,
	)
	if err != nil {
		return 0, fmt.Errorf("add project image: %w", err)
	}
	return res.LastInsertId()
}

func (r *ProjectsRepo) DeleteImage(ctx context.Context, id int64) (string, error) {
	var path string
	if err := r.db.QueryRowContext(ctx, `SELECT image_path FROM project_images WHERE id = ?`, id).Scan(&path); err != nil {
		return "", fmt.Errorf("find project image: %w", err)
	}
	if _, err := r.db.ExecContext(ctx, `DELETE FROM project_images WHERE id = ?`, id); err != nil {
		return "", fmt.Errorf("delete project image: %w", err)
	}
	return path, nil
}

func (r *ProjectsRepo) ReorderImages(ctx context.Context, order []struct {
	ID        int64
	SortOrder int
}) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin reorder tx: %w", err)
	}
	for _, o := range order {
		if _, err := tx.ExecContext(ctx, `UPDATE project_images SET sort_order = ? WHERE id = ?`, o.SortOrder, o.ID); err != nil {
			tx.Rollback()
			return fmt.Errorf("reorder image %d: %w", o.ID, err)
		}
	}
	return tx.Commit()
}

func decodeTags(tagsJSON string) []string {
	var tags []string
	if tagsJSON == "" {
		return []string{}
	}
	if err := json.Unmarshal([]byte(tagsJSON), &tags); err != nil {
		return []string{}
	}
	return tags
}
