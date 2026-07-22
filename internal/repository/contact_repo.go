package repository

import (
	"context"
	"fmt"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

type ContactRepo struct {
	db *gorm.DB
}

func NewContactRepo(db *gorm.DB) *ContactRepo {
	return &ContactRepo{db: db}
}

func (r *ContactRepo) Create(ctx context.Context, s *models.ContactSubmission) (uint, error) {
	if err := r.db.WithContext(ctx).Create(s).Error; err != nil {
		return 0, fmt.Errorf("create contact submission: %w", err)
	}
	return s.ID, nil
}

func (r *ContactRepo) List(ctx context.Context, page, pageSize int) ([]models.ContactSubmission, int64, error) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}
	offset := (page - 1) * pageSize

	var total int64
	if err := r.db.WithContext(ctx).Model(&models.ContactSubmission{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("count contact submissions: %w", err)
	}

	var submissions []models.ContactSubmission
	err := r.db.WithContext(ctx).Order("created_at DESC").Limit(pageSize).Offset(offset).Find(&submissions).Error
	if err != nil {
		return nil, 0, fmt.Errorf("list contact submissions: %w", err)
	}
	return submissions, total, nil
}

func (r *ContactRepo) Get(ctx context.Context, id uint) (*models.ContactSubmission, error) {
	var s models.ContactSubmission
	if err := r.db.WithContext(ctx).First(&s, id).Error; err != nil {
		return nil, fmt.Errorf("get contact submission: %w", err)
	}
	return &s, nil
}

func (r *ContactRepo) Delete(ctx context.Context, id uint) error {
	if err := r.db.WithContext(ctx).Delete(&models.ContactSubmission{}, id).Error; err != nil {
		return fmt.Errorf("delete contact submission: %w", err)
	}
	return nil
}
