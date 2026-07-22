package repository

import (
	"context"
	"fmt"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

type ProfileRepo struct {
	db *gorm.DB
}

func NewProfileRepo(db *gorm.DB) *ProfileRepo {
	return &ProfileRepo{db: db}
}

func (r *ProfileRepo) Get(ctx context.Context) (*models.Profile, error) {
	var p models.Profile
	if err := r.db.WithContext(ctx).First(&p, 1).Error; err != nil {
		return nil, fmt.Errorf("get profile: %w", err)
	}
	return &p, nil
}

func (r *ProfileRepo) Upsert(ctx context.Context, p *models.Profile) error {
	p.ID = 1
	if err := r.db.WithContext(ctx).Save(p).Error; err != nil {
		return fmt.Errorf("upsert profile: %w", err)
	}
	return nil
}

func (r *ProfileRepo) Exists(ctx context.Context) (bool, error) {
	var count int64
	if err := r.db.WithContext(ctx).Model(&models.Profile{}).Where("id = ?", 1).Count(&count).Error; err != nil {
		return false, fmt.Errorf("check profile exists: %w", err)
	}
	return count > 0, nil
}
