package db

import (
	"fmt"

	"gorm.io/gorm"

	"portofolio/internal/models"
)

// Migrate creates/updates tables for every model via GORM's AutoMigrate,
// which generates dialect-appropriate DDL for whichever driver Open()
// connected with (SQLite/MySQL/Postgres) — this is what keeps the schema
// portable across databases without hand-written per-dialect SQL.
func Migrate(gdb *gorm.DB) error {
	err := gdb.AutoMigrate(
		&models.Profile{},
		&models.SkillCategory{},
		&models.SkillChip{},
		&models.Project{},
		&models.ProjectImage{},
		&models.ContactSubmission{},
		&models.AdminUser{},
		&models.Session{},
	)
	if err != nil {
		return fmt.Errorf("automigrate: %w", err)
	}
	return nil
}
