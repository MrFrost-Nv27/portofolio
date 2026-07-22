package httpapi

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"portofolio/internal/models"
	"portofolio/internal/repository"
)

type PublicHandlers struct {
	profileRepo  *repository.ProfileRepo
	skillsRepo   *repository.SkillsRepo
	projectsRepo *repository.ProjectsRepo
	contactRepo  *repository.ContactRepo
}

func NewPublicHandlers(
	profileRepo *repository.ProfileRepo,
	skillsRepo *repository.SkillsRepo,
	projectsRepo *repository.ProjectsRepo,
	contactRepo *repository.ContactRepo,
) *PublicHandlers {
	return &PublicHandlers{
		profileRepo:  profileRepo,
		skillsRepo:   skillsRepo,
		projectsRepo: projectsRepo,
		contactRepo:  contactRepo,
	}
}

func (h *PublicHandlers) GetProfile(w http.ResponseWriter, r *http.Request) {
	profile, err := h.profileRepo.Get(r.Context())
	if err != nil {
		writeError(w, http.StatusNotFound, "profile not found")
		return
	}
	writeJSON(w, http.StatusOK, profile)
}

func (h *PublicHandlers) ListSkills(w http.ResponseWriter, r *http.Request) {
	categories, err := h.skillsRepo.ListCategories(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load skills")
		return
	}
	writeJSON(w, http.StatusOK, categories)
}

func (h *PublicHandlers) ListProjects(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	projects, err := h.projectsRepo.List(r.Context(), repository.ProjectFilter{
		Category:      category,
		PublishedOnly: true,
	})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load projects")
		return
	}
	writeJSON(w, http.StatusOK, projects)
}

func (h *PublicHandlers) GetProject(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid project id")
		return
	}
	project, err := h.projectsRepo.Get(r.Context(), id)
	if err != nil {
		writeError(w, http.StatusNotFound, "project not found")
		return
	}
	if !project.Published {
		writeError(w, http.StatusNotFound, "project not found")
		return
	}
	writeJSON(w, http.StatusOK, project)
}

func (h *PublicHandlers) SubmitContact(w http.ResponseWriter, r *http.Request) {
	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Service = strings.TrimSpace(req.Service)
	req.Message = strings.TrimSpace(req.Message)
	if req.Name == "" || req.Service == "" || req.Message == "" {
		writeError(w, http.StatusBadRequest, "name, service, and message are required")
		return
	}
	if req.Locale != "en" {
		req.Locale = "id"
	}

	submission := &models.ContactSubmission{
		Name:      req.Name,
		Email:     strings.TrimSpace(req.Email),
		Service:   req.Service,
		Message:   req.Message,
		Locale:    req.Locale,
		IPAddress: clientIP(r),
		UserAgent: r.UserAgent(),
	}

	id, err := h.contactRepo.Create(r.Context(), submission)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to save submission")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{"id": id})
}

func clientIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		return strings.TrimSpace(strings.Split(fwd, ",")[0])
	}
	host := r.RemoteAddr
	if idx := strings.LastIndex(host, ":"); idx != -1 {
		return host[:idx]
	}
	return host
}
