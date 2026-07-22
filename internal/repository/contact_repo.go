package repository

import (
	"context"
	"database/sql"
	"fmt"

	"portofolio/internal/models"
)

type ContactRepo struct {
	db *sql.DB
}

func NewContactRepo(db *sql.DB) *ContactRepo {
	return &ContactRepo{db: db}
}

func (r *ContactRepo) Create(ctx context.Context, s *models.ContactSubmission) (int64, error) {
	res, err := r.db.ExecContext(ctx, `
		INSERT INTO contact_submissions (name, email, service, message, locale, ip_address, user_agent)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, s.Name, nullable(s.Email), s.Service, s.Message, s.Locale, nullable(s.IPAddress), nullable(s.UserAgent))
	if err != nil {
		return 0, fmt.Errorf("create contact submission: %w", err)
	}
	return res.LastInsertId()
}

func (r *ContactRepo) List(ctx context.Context, page, pageSize int) ([]models.ContactSubmission, int, error) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}
	offset := (page - 1) * pageSize

	var total int
	if err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM contact_submissions`).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("count contact submissions: %w", err)
	}

	rows, err := r.db.QueryContext(ctx, `
		SELECT id, name, COALESCE(email, ''), service, message, locale,
		       COALESCE(ip_address, ''), COALESCE(user_agent, ''), created_at
		FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?
	`, pageSize, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("list contact submissions: %w", err)
	}
	defer rows.Close()

	var submissions []models.ContactSubmission
	for rows.Next() {
		var s models.ContactSubmission
		if err := rows.Scan(&s.ID, &s.Name, &s.Email, &s.Service, &s.Message, &s.Locale,
			&s.IPAddress, &s.UserAgent, &s.CreatedAt); err != nil {
			return nil, 0, fmt.Errorf("scan contact submission: %w", err)
		}
		submissions = append(submissions, s)
	}
	return submissions, total, rows.Err()
}

func (r *ContactRepo) Get(ctx context.Context, id int64) (*models.ContactSubmission, error) {
	row := r.db.QueryRowContext(ctx, `
		SELECT id, name, COALESCE(email, ''), service, message, locale,
		       COALESCE(ip_address, ''), COALESCE(user_agent, ''), created_at
		FROM contact_submissions WHERE id = ?
	`, id)
	var s models.ContactSubmission
	if err := row.Scan(&s.ID, &s.Name, &s.Email, &s.Service, &s.Message, &s.Locale,
		&s.IPAddress, &s.UserAgent, &s.CreatedAt); err != nil {
		return nil, fmt.Errorf("get contact submission: %w", err)
	}
	return &s, nil
}

func (r *ContactRepo) Delete(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM contact_submissions WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("delete contact submission: %w", err)
	}
	return nil
}
