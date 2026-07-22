package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                 string
	DBPath               string
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
		DBPath:               getEnv("DB_PATH", "data/portfolio.db"),
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
