package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"portofolio/internal/models"
)

type AuthRepo struct {
	db *sql.DB
}

func NewAuthRepo(db *sql.DB) *AuthRepo {
	return &AuthRepo{db: db}
}

func (r *AuthRepo) GetUserByUsername(ctx context.Context, username string) (*models.AdminUser, error) {
	row := r.db.QueryRowContext(ctx, `SELECT id, username, password_hash FROM admin_users WHERE username = ?`, username)
	var u models.AdminUser
	if err := row.Scan(&u.ID, &u.Username, &u.PasswordHash); err != nil {
		return nil, fmt.Errorf("get admin user: %w", err)
	}
	return &u, nil
}

func (r *AuthRepo) CreateUser(ctx context.Context, username, passwordHash string) (int64, error) {
	res, err := r.db.ExecContext(ctx,
		`INSERT INTO admin_users (username, password_hash) VALUES (?, ?)`, username, passwordHash)
	if err != nil {
		return 0, fmt.Errorf("create admin user: %w", err)
	}
	return res.LastInsertId()
}

func (r *AuthRepo) AnyUserExists(ctx context.Context) (bool, error) {
	var count int
	if err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM admin_users`).Scan(&count); err != nil {
		return false, fmt.Errorf("check admin users: %w", err)
	}
	return count > 0, nil
}

func (r *AuthRepo) CreateSession(ctx context.Context, token string, adminUserID int64, expiresAt time.Time) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO sessions (id, admin_user_id, expires_at) VALUES (?, ?, ?)`, token, adminUserID, expiresAt)
	if err != nil {
		return fmt.Errorf("create session: %w", err)
	}
	return nil
}

func (r *AuthRepo) GetSessionUser(ctx context.Context, token string) (*models.AdminUser, error) {
	row := r.db.QueryRowContext(ctx, `
		SELECT au.id, au.username, au.password_hash
		FROM sessions s
		JOIN admin_users au ON au.id = s.admin_user_id
		WHERE s.id = ? AND s.expires_at > CURRENT_TIMESTAMP
	`, token)
	var u models.AdminUser
	if err := row.Scan(&u.ID, &u.Username, &u.PasswordHash); err != nil {
		return nil, fmt.Errorf("get session user: %w", err)
	}
	return &u, nil
}

func (r *AuthRepo) DeleteSession(ctx context.Context, token string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM sessions WHERE id = ?`, token)
	if err != nil {
		return fmt.Errorf("delete session: %w", err)
	}
	return nil
}
