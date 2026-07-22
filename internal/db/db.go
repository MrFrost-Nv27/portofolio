package db

import (
	"fmt"
	"os"
	"path/filepath"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/glebarez/sqlite"

	"portofolio/internal/config"
)

// Open connects to the database configured by cfg.DBDriver, defaulting to
// a local SQLite file. Swapping to MySQL/Postgres only requires setting
// DB_DRIVER and DB_DSN — no code changes, since every repository is
// written against GORM's dialect-agnostic API.
func Open(cfg config.Config) (*gorm.DB, error) {
	var dialector gorm.Dialector

	switch cfg.DBDriver {
	case config.DriverMySQL:
		if cfg.DBDSN == "" {
			return nil, fmt.Errorf("DB_DSN is required when DB_DRIVER=mysql")
		}
		dialector = mysql.Open(cfg.DBDSN)

	case config.DriverPostgres:
		if cfg.DBDSN == "" {
			return nil, fmt.Errorf("DB_DSN is required when DB_DRIVER=postgres")
		}
		dialector = postgres.Open(cfg.DBDSN)

	case config.DriverSQLite, "":
		if dir := filepath.Dir(cfg.DBPath); dir != "." {
			if err := os.MkdirAll(dir, 0o755); err != nil {
				return nil, fmt.Errorf("create db dir: %w", err)
			}
		}
		dsn := fmt.Sprintf("file:%s?_pragma=busy_timeout(5000)&_pragma=journal_mode(WAL)&_pragma=foreign_keys(ON)", cfg.DBPath)
		dialector = sqlite.Open(dsn)

	default:
		return nil, fmt.Errorf("unsupported DB_DRIVER %q (expected sqlite, mysql, or postgres)", cfg.DBDriver)
	}

	gdb, err := gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return nil, fmt.Errorf("open %s database: %w", cfg.DBDriver, err)
	}

	sqlDB, err := gdb.DB()
	if err != nil {
		return nil, fmt.Errorf("get underlying sql.DB: %w", err)
	}
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("ping %s database: %w", cfg.DBDriver, err)
	}

	return gdb, nil
}
