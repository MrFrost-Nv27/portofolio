// Mirrors the JSON shape of backend/internal/models — keep field names in
// sync with the Go structs' `json:"..."` tags.

export interface Profile {
  name: string
  role_id: string
  role_en: string
  bio_p1_id: string
  bio_p2_id: string
  bio_p1_en: string
  bio_p2_en: string
  photo_path: string
  cv_path: string
  email: string
  whatsapp_number: string
  address: string
  experience_since_year: number
  projects_completed: number
  languages_count: number
  github_url: string
  gitlab_url: string
  linkedin_url: string
  instagram_url: string
}

export interface SkillChip {
  id: number
  category_id: number
  label: string
  sort_order: number
}

export interface SkillCategory {
  id: number
  name_id: string
  name_en: string
  icon: string
  sort_order: number
  chips: SkillChip[]
}

export interface ProjectImage {
  id: number
  project_id: number
  image_path: string
  sort_order: number
}

export interface Project {
  id: number
  title_id: string
  title_en: string
  category: string
  description_id: string
  description_en: string
  tags: string[]
  url_demo: string
  url_repo: string
  hero_image_path: string
  sort_order: number
  published: boolean
  images: ProjectImage[]
  created_at: string
  updated_at: string
}

export interface ContactRequest {
  name: string
  email?: string
  service: string
  message: string
  locale: 'id' | 'en'
}

export interface AdminUser {
  id: number
  username: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  service: string
  message: string
  locale: string
  ip_address: string
  user_agent: string
  created_at: string
}
