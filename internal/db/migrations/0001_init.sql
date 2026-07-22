CREATE TABLE profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  role_id TEXT NOT NULL,
  role_en TEXT NOT NULL,
  bio_p1_id TEXT NOT NULL,
  bio_p2_id TEXT NOT NULL,
  bio_p1_en TEXT NOT NULL,
  bio_p2_en TEXT NOT NULL,
  photo_path TEXT,
  cv_path TEXT,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  address TEXT,
  experience_since_year INTEGER NOT NULL,
  projects_completed INTEGER NOT NULL,
  languages_count INTEGER NOT NULL,
  github_url TEXT,
  gitlab_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill_chips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_skill_chips_category ON skill_chips(category_id);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  url_demo TEXT,
  url_repo TEXT,
  hero_image_path TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_published_sort ON projects(published, sort_order);

CREATE TABLE project_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_project_images_project ON project_images(project_id);

CREATE TABLE contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);

CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
