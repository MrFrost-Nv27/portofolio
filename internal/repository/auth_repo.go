package repository

import (
	"context"
	"fmt"
	"time"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

type AuthRepo struct {
	db *gorm.DB
}

func NewAuthRepo(db *gorm.DB) *AuthRepo {
	return &AuthRepo{db: db}
}

func (r *AuthRepo) GetUserByUsername(ctx context.Context, username string) (*models.AdminUser, error) {
	var u models.AdminUser
	if err := r.db.WithContext(ctx).Where("username = ?", username).First(&u).Error; err != nil {
		return nil, fmt.Errorf("get admin user: %w", err)
	}
	return &u, nil
}

func (r *AuthRepo) CreateUser(ctx context.Context, username, passwordHash string) (uint, error) {
	u := models.AdminUser{Username: username, PasswordHash: passwordHash}
	if err := r.db.WithContext(ctx).Create(&u).Error; err != nil {
		return 0, fmt.Errorf("create admin user: %w", err)
	}
	return u.ID, nil
}

func (r *AuthRepo) AnyUserExists(ctx context.Context) (bool, error) {
	var count int64
	if err := r.db.WithContext(ctx).Model(&models.AdminUser{}).Count(&count).Error; err != nil {
		return false, fmt.Errorf("check admin users: %w", err)
	}
	return count > 0, nil
}

func (r *AuthRepo) CreateSession(ctx context.Context, token string, adminUserID uint, expiresAt time.Time) error {
	s := models.Session{ID: token, AdminUserID: adminUserID, ExpiresAt: expiresAt}
	if err := r.db.WithContext(ctx).Create(&s).Error; err != nil {
		return fmt.Errorf("create session: %w", err)
	}
	return nil
}

func (r *AuthRepo) GetSessionUser(ctx context.Context, token string) (*models.AdminUser, error) {
	var session models.Session
	if err := r.db.WithContext(ctx).Where("id = ? AND expires_at > ?", token, time.Now()).First(&session).Error; err != nil {
		return nil, fmt.Errorf("get session: %w", err)
	}
	var u models.AdminUser
	if err := r.db.WithContext(ctx).First(&u, session.AdminUserID).Error; err != nil {
		return nil, fmt.Errorf("get session user: %w", err)
	}
	return &u, nil
}

func (r *AuthRepo) DeleteSession(ctx context.Context, token string) error {
	if err := r.db.WithContext(ctx).Delete(&models.Session{}, "id = ?", token).Error; err != nil {
		return fmt.Errorf("delete session: %w", err)
	}
	return nil
}
