package repository

import (
	"context"
	"database/sql"
	"fmt"

	"portofolio/internal/models"
)

type SkillsRepo struct {
	db *sql.DB
}

func NewSkillsRepo(db *sql.DB) *SkillsRepo {
	return &SkillsRepo{db: db}
}

func (r *SkillsRepo) ListCategories(ctx context.Context) ([]models.SkillCategory, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, name_id, name_en, COALESCE(icon, ''), sort_order
		FROM skill_categories ORDER BY sort_order, id
	`)
	if err != nil {
		return nil, fmt.Errorf("list skill categories: %w", err)
	}
	defer rows.Close()

	var categories []models.SkillCategory
	for rows.Next() {
		var c models.SkillCategory
		if err := rows.Scan(&c.ID, &c.NameID, &c.NameEn, &c.Icon, &c.SortOrder); err != nil {
			return nil, fmt.Errorf("scan skill category: %w", err)
		}
		c.Chips = []models.SkillChip{}
		categories = append(categories, c)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	// Build the id->index lookup only after the slice has stopped growing —
	// taking pointers into a slice mid-append is unsafe since append can
	// reallocate the backing array, silently orphaning earlier pointers.
	byID := make(map[int64]*models.SkillCategory, len(categories))
	for i := range categories {
		byID[categories[i].ID] = &categories[i]
	}

	chipRows, err := r.db.QueryContext(ctx, `
		SELECT id, category_id, label, sort_order FROM skill_chips ORDER BY category_id, sort_order, id
	`)
	if err != nil {
		return nil, fmt.Errorf("list skill chips: %w", err)
	}
	defer chipRows.Close()

	for chipRows.Next() {
		var chip models.SkillChip
		if err := chipRows.Scan(&chip.ID, &chip.CategoryID, &chip.Label, &chip.SortOrder); err != nil {
			return nil, fmt.Errorf("scan skill chip: %w", err)
		}
		if cat, ok := byID[chip.CategoryID]; ok {
			cat.Chips = append(cat.Chips, chip)
		}
	}
	if err := chipRows.Err(); err != nil {
		return nil, err
	}

	return categories, nil
}

func (r *SkillsRepo) CreateCategory(ctx context.Context, c *models.SkillCategory) (int64, error) {
	res, err := r.db.ExecContext(ctx,
		`INSERT INTO skill_categories (name_id, name_en, icon, sort_order) VALUES (?, ?, ?, ?)`,
		c.NameID, c.NameEn, nullable(c.Icon), c.SortOrder,
	)
	if err != nil {
		return 0, fmt.Errorf("create skill category: %w", err)
	}
	return res.LastInsertId()
}

func (r *SkillsRepo) UpdateCategory(ctx context.Context, c *models.SkillCategory) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE skill_categories SET name_id = ?, name_en = ?, icon = ?, sort_order = ? WHERE id = ?`,
		c.NameID, c.NameEn, nullable(c.Icon), c.SortOrder, c.ID,
	)
	if err != nil {
		return fmt.Errorf("update skill category: %w", err)
	}
	return nil
}

func (r *SkillsRepo) DeleteCategory(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM skill_categories WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("delete skill category: %w", err)
	}
	return nil
}

func (r *SkillsRepo) CreateChip(ctx context.Context, chip *models.SkillChip) (int64, error) {
	res, err := r.db.ExecContext(ctx,
		`INSERT INTO skill_chips (category_id, label, sort_order) VALUES (?, ?, ?)`,
		chip.CategoryID, chip.Label, chip.SortOrder,
	)
	if err != nil {
		return 0, fmt.Errorf("create skill chip: %w", err)
	}
	return res.LastInsertId()
}

func (r *SkillsRepo) UpdateChip(ctx context.Context, chip *models.SkillChip) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE skill_chips SET category_id = ?, label = ?, sort_order = ? WHERE id = ?`,
		chip.CategoryID, chip.Label, chip.SortOrder, chip.ID,
	)
	if err != nil {
		return fmt.Errorf("update skill chip: %w", err)
	}
	return nil
}

func (r *SkillsRepo) DeleteChip(ctx context.Context, id int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM skill_chips WHERE id = ?`, id)
	if err != nil {
		return fmt.Errorf("delete skill chip: %w", err)
	}
	return nil
}
