package models

import "time"

type Profile struct {
	Name                string `json:"name"`
	RoleID              string `json:"role_id"`
	RoleEn              string `json:"role_en"`
	BioP1ID             string `json:"bio_p1_id"`
	BioP2ID             string `json:"bio_p2_id"`
	BioP1En             string `json:"bio_p1_en"`
	BioP2En             string `json:"bio_p2_en"`
	PhotoPath           string `json:"photo_path"`
	CVPath              string `json:"cv_path"`
	Email               string `json:"email"`
	WhatsappNumber      string `json:"whatsapp_number"`
	Address             string `json:"address"`
	ExperienceSinceYear int    `json:"experience_since_year"`
	ProjectsCompleted   int    `json:"projects_completed"`
	LanguagesCount      int    `json:"languages_count"`
	GithubURL           string `json:"github_url"`
	GitlabURL           string `json:"gitlab_url"`
	LinkedinURL         string `json:"linkedin_url"`
	InstagramURL        string `json:"instagram_url"`
}

type SkillCategory struct {
	ID        int64       `json:"id"`
	NameID    string      `json:"name_id"`
	NameEn    string      `json:"name_en"`
	Icon      string      `json:"icon"`
	SortOrder int         `json:"sort_order"`
	Chips     []SkillChip `json:"chips"`
}

type SkillChip struct {
	ID         int64  `json:"id"`
	CategoryID int64  `json:"category_id"`
	Label      string `json:"label"`
	SortOrder  int    `json:"sort_order"`
}

type Project struct {
	ID            int64          `json:"id"`
	TitleID       string         `json:"title_id"`
	TitleEn       string         `json:"title_en"`
	Category      string         `json:"category"`
	DescriptionID string         `json:"description_id"`
	DescriptionEn string         `json:"description_en"`
	Tags          []string       `json:"tags"`
	URLDemo       string         `json:"url_demo"`
	URLRepo       string         `json:"url_repo"`
	HeroImagePath string         `json:"hero_image_path"`
	SortOrder     int            `json:"sort_order"`
	Published     bool           `json:"published"`
	Images        []ProjectImage `json:"images"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

type ProjectImage struct {
	ID        int64  `json:"id"`
	ProjectID int64  `json:"project_id"`
	ImagePath string `json:"image_path"`
	SortOrder int    `json:"sort_order"`
}

type ContactSubmission struct {
	ID        int64     `json:"id"`
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
	ID           int64  `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"-"`
}
