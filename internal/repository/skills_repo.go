package repository

import (
	"context"
	"fmt"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

type SkillsRepo struct {
	db *gorm.DB
}

func NewSkillsRepo(db *gorm.DB) *SkillsRepo {
	return &SkillsRepo{db: db}
}

func (r *SkillsRepo) ListCategories(ctx context.Context) ([]models.SkillCategory, error) {
	var categories []models.SkillCategory
	err := r.db.WithContext(ctx).
		Preload("Chips", func(db *gorm.DB) *gorm.DB {
			return db.Order("skill_chips.sort_order, skill_chips.id")
		}).
		Order("sort_order, id").
		Find(&categories).Error
	if err != nil {
		return nil, fmt.Errorf("list skill categories: %w", err)
	}
	for i := range categories {
		if categories[i].Chips == nil {
			categories[i].Chips = []models.SkillChip{}
		}
	}
	return categories, nil
}

func (r *SkillsRepo) CreateCategory(ctx context.Context, c *models.SkillCategory) (uint, error) {
	if err := r.db.WithContext(ctx).Create(c).Error; err != nil {
		return 0, fmt.Errorf("create skill category: %w", err)
	}
	return c.ID, nil
}

func (r *SkillsRepo) UpdateCategory(ctx context.Context, c *models.SkillCategory) error {
	err := r.db.WithContext(ctx).Model(&models.SkillCategory{}).Where("id = ?", c.ID).
		Updates(map[string]any{
			"name_id":    c.NameID,
			"name_en":    c.NameEn,
			"icon":       c.Icon,
			"sort_order": c.SortOrder,
		}).Error
	if err != nil {
		return fmt.Errorf("update skill category: %w", err)
	}
	return nil
}

func (r *SkillsRepo) DeleteCategory(ctx context.Context, id uint) error {
	if err := r.db.WithContext(ctx).Delete(&models.SkillCategory{}, id).Error; err != nil {
		return fmt.Errorf("delete skill category: %w", err)
	}
	return nil
}

func (r *SkillsRepo) CreateChip(ctx context.Context, chip *models.SkillChip) (uint, error) {
	if err := r.db.WithContext(ctx).Create(chip).Error; err != nil {
		return 0, fmt.Errorf("create skill chip: %w", err)
	}
	return chip.ID, nil
}

func (r *SkillsRepo) UpdateChip(ctx context.Context, chip *models.SkillChip) error {
	err := r.db.WithContext(ctx).Model(&models.SkillChip{}).Where("id = ?", chip.ID).
		Updates(map[string]any{
			"category_id": chip.CategoryID,
			"label":       chip.Label,
			"sort_order":  chip.SortOrder,
		}).Error
	if err != nil {
		return fmt.Errorf("update skill chip: %w", err)
	}
	return nil
}

func (r *SkillsRepo) DeleteChip(ctx context.Context, id uint) error {
	if err := r.db.WithContext(ctx).Delete(&models.SkillChip{}, id).Error; err != nil {
		return fmt.Errorf("delete skill chip: %w", err)
	}
	return nil
}
