package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// DBDriver identifies which GORM dialect to connect with. SQLite is the
// zero-config default; MySQL/Postgres require DBDSN to be set.
type DBDriver string

const (
	DriverSQLite   DBDriver = "sqlite"
	DriverMySQL    DBDriver = "mysql"
	DriverPostgres DBDriver = "postgres"
)

type Config struct {
	Port                 string
	DBDriver             DBDriver
	DBPath               string // used when DBDriver == sqlite
	DBDSN                string // used when DBDriver == mysql | postgres
	UploadsDir           string
	SessionCookieSecure  bool
	AdminInitialPassword string
}

func Load() Config {
	// Load .env into the process environment if present. A missing file is
	// expected (e.g. in production where env vars are set directly by the
	// host/orchestrator) and is not an error; any other failure (bad syntax,
	// permissions) is logged but non-fatal.
	if err := godotenv.Load(); err != nil && !os.IsNotExist(err) {
		log.Printf("warning: could not load .env: %v", err)
	}

	return Config{
		Port:                 getEnv("PORT", "8080"),
		DBDriver:             DBDriver(getEnv("DB_DRIVER", string(DriverSQLite))),
		DBPath:               getEnv("DB_PATH", "data/portfolio.db"),
		DBDSN:                os.Getenv("DB_DSN"),
		UploadsDir:           getEnv("UPLOADS_DIR", "uploads"),
		SessionCookieSecure:  getEnv("SESSION_COOKIE_SECURE", "false") == "true",
		AdminInitialPassword: os.Getenv("ADMIN_INITIAL_PASSWORD"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
