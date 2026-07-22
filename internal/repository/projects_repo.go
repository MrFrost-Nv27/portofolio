package repository

import (
	"context"
	"fmt"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

type ProjectsRepo struct {
	db *gorm.DB
}

func NewProjectsRepo(db *gorm.DB) *ProjectsRepo {
	return &ProjectsRepo{db: db}
}

type ProjectFilter struct {
	Category       string
	PublishedOnly  bool
	IncludeGallery bool
}

func (r *ProjectsRepo) List(ctx context.Context, filter ProjectFilter) ([]models.Project, error) {
	q := r.db.WithContext(ctx).Model(&models.Project{})
	if filter.PublishedOnly {
		q = q.Where("published = ?", true)
	}
	if filter.Category != "" {
		q = q.Where("category = ?", filter.Category)
	}
	if filter.IncludeGallery {
		q = q.Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("project_images.sort_order, project_images.id")
		})
	}

	var projects []models.Project
	if err := q.Order("sort_order, id").Find(&projects).Error; err != nil {
		return nil, fmt.Errorf("list projects: %w", err)
	}
	for i := range projects {
		if projects[i].Images == nil {
			projects[i].Images = []models.ProjectImage{}
		}
	}
	return projects, nil
}

func (r *ProjectsRepo) Get(ctx context.Context, id uint) (*models.Project, error) {
	var p models.Project
	err := r.db.WithContext(ctx).
		Preload("Images", func(db *gorm.DB) *gorm.DB {
			return db.Order("project_images.sort_order, project_images.id")
		}).
		First(&p, id).Error
	if err != nil {
		return nil, fmt.Errorf("get project: %w", err)
	}
	if p.Images == nil {
		p.Images = []models.ProjectImage{}
	}
	return &p, nil
}

func (r *ProjectsRepo) Create(ctx context.Context, p *models.Project) (uint, error) {
	if err := r.db.WithContext(ctx).Create(p).Error; err != nil {
		return 0, fmt.Errorf("create project: %w", err)
	}
	return p.ID, nil
}

func (r *ProjectsRepo) Update(ctx context.Context, p *models.Project) error {
	err := r.db.WithContext(ctx).Model(&models.Project{}).Where("id = ?", p.ID).
		Updates(map[string]any{
			"title_id":        p.TitleID,
			"title_en":        p.TitleEn,
			"category":        p.Category,
			"description_id":  p.DescriptionID,
			"description_en":  p.DescriptionEn,
			"tags":            p.Tags,
			"url_demo":        p.URLDemo,
			"url_repo":        p.URLRepo,
			"hero_image_path": p.HeroImagePath,
			"sort_order":      p.SortOrder,
			"published":       p.Published,
		}).Error
	if err != nil {
		return fmt.Errorf("update project: %w", err)
	}
	return nil
}

func (r *ProjectsRepo) Delete(ctx context.Context, id uint) error {
	if err := r.db.WithContext(ctx).Delete(&models.Project{}, id).Error; err != nil {
		return fmt.Errorf("delete project: %w", err)
	}
	return nil
}

func (r *ProjectsRepo) AddImage(ctx context.Context, img *models.ProjectImage) (uint, error) {
	if err := r.db.WithContext(ctx).Create(img).Error; err != nil {
		return 0, fmt.Errorf("add project image: %w", err)
	}
	return img.ID, nil
}

func (r *ProjectsRepo) DeleteImage(ctx context.Context, id uint) (string, error) {
	var img models.ProjectImage
	if err := r.db.WithContext(ctx).First(&img, id).Error; err != nil {
		return "", fmt.Errorf("find project image: %w", err)
	}
	if err := r.db.WithContext(ctx).Delete(&models.ProjectImage{}, id).Error; err != nil {
		return "", fmt.Errorf("delete project image: %w", err)
	}
	return img.ImagePath, nil
}

func (r *ProjectsRepo) ReorderImages(ctx context.Context, order []struct {
	ID        uint
	SortOrder int
}) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		for _, o := range order {
			if err := tx.Model(&models.ProjectImage{}).Where("id = ?", o.ID).
				Update("sort_order", o.SortOrder).Error; err != nil {
				return fmt.Errorf("reorder image %d: %w", o.ID, err)
			}
		}
		return nil
	})
}
