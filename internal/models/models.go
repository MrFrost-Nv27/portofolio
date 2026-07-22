package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

// StringSlice adapts []string to a single JSON-encoded TEXT column so it
// works identically across SQLite/MySQL/Postgres without needing a native
// array column type (Postgres has one, MySQL/SQLite don't).
type StringSlice []string

func (s StringSlice) Value() (driver.Value, error) {
	if s == nil {
		return "[]", nil
	}
	b, err := json.Marshal([]string(s))
	return string(b), err
}

func (s *StringSlice) Scan(value any) error {
	if value == nil {
		*s = StringSlice{}
		return nil
	}
	switch v := value.(type) {
	case string:
		return json.Unmarshal([]byte(v), s)
	case []byte:
		return json.Unmarshal(v, s)
	default:
		return errors.New("models: unsupported type for StringSlice scan")
	}
}

// Profile is a singleton row (ID always 1).
type Profile struct {
	ID                  uint      `gorm:"primaryKey;autoIncrement:false" json:"-"`
	Name                string    `json:"name"`
	RoleID              string    `json:"role_id"`
	RoleEn              string    `json:"role_en"`
	BioP1ID             string    `json:"bio_p1_id"`
	BioP2ID             string    `json:"bio_p2_id"`
	BioP1En             string    `json:"bio_p1_en"`
	BioP2En             string    `json:"bio_p2_en"`
	PhotoPath           string    `json:"photo_path"`
	CVPath              string    `json:"cv_path"`
	Email               string    `json:"email"`
	WhatsappNumber      string    `json:"whatsapp_number"`
	Address             string    `json:"address"`
	ExperienceSinceYear int       `json:"experience_since_year"`
	ProjectsCompleted   int       `json:"projects_completed"`
	LanguagesCount      int       `json:"languages_count"`
	GithubURL           string    `json:"github_url"`
	GitlabURL           string    `json:"gitlab_url"`
	LinkedinURL         string    `json:"linkedin_url"`
	InstagramURL        string    `json:"instagram_url"`
	UpdatedAt           time.Time `json:"-"`
}

type SkillCategory struct {
	ID        uint        `gorm:"primaryKey" json:"id"`
	NameID    string      `json:"name_id"`
	NameEn    string      `json:"name_en"`
	Icon      string      `json:"icon"`
	SortOrder int         `json:"sort_order"`
	Chips     []SkillChip `gorm:"foreignKey:CategoryID;constraint:OnDelete:CASCADE" json:"chips"`
}

type SkillChip struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	CategoryID uint   `json:"category_id"`
	Label      string `json:"label"`
	SortOrder  int    `json:"sort_order"`
}

type Project struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	TitleID       string         `json:"title_id"`
	TitleEn       string         `json:"title_en"`
	Category      string         `gorm:"index" json:"category"`
	DescriptionID string         `json:"description_id"`
	DescriptionEn string         `json:"description_en"`
	Tags          StringSlice    `gorm:"type:text" json:"tags"`
	URLDemo       string         `json:"url_demo"`
	URLRepo       string         `json:"url_repo"`
	HeroImagePath string         `json:"hero_image_path"`
	SortOrder     int            `gorm:"index" json:"sort_order"`
	Published     bool           `gorm:"index" json:"published"`
	Images        []ProjectImage `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE" json:"images"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

type ProjectImage struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	ProjectID uint   `json:"project_id"`
	ImagePath string `json:"image_path"`
	SortOrder int    `json:"sort_order"`
}

type ContactSubmission struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Service   string    `json:"service"`
	Message   string    `json:"message"`
	Locale    string    `json:"locale"`
	IPAddress string    `json:"ip_address"`
	UserAgent string    `json:"user_agent"`
	CreatedAt time.Time `json:"created_at"`
}

type AdminUser struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Username     string    `gorm:"uniqueIndex" json:"username"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"-"`
}

// Session is deliberately unkeyed by an autoincrement ID — the token
// itself (a random 32-byte value, see internal/auth) is the primary key,
// which is also the session cookie's value.
type Session struct {
	ID          string `gorm:"primaryKey"`
	AdminUserID uint
	ExpiresAt   time.Time `gorm:"index"`
	CreatedAt   time.Time
}
