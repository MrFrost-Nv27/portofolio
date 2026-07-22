package httpapi

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

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

func (h *PublicHandlers) GetProfile(c *gin.Context) {
	profile, err := h.profileRepo.Get(c.Request.Context())
	if err != nil {
		writeError(c, http.StatusNotFound, "profile not found")
		return
	}
	c.JSON(http.StatusOK, profile)
}

func (h *PublicHandlers) ListSkills(c *gin.Context) {
	categories, err := h.skillsRepo.ListCategories(c.Request.Context())
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to load skills")
		return
	}
	c.JSON(http.StatusOK, categories)
}

func (h *PublicHandlers) ListProjects(c *gin.Context) {
	category := c.Query("category")
	projects, err := h.projectsRepo.List(c.Request.Context(), repository.ProjectFilter{
		Category:      category,
		PublishedOnly: true,
	})
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to load projects")
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *PublicHandlers) GetProject(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		writeError(c, http.StatusBadRequest, "invalid project id")
		return
	}
	project, err := h.projectsRepo.Get(c.Request.Context(), uint(id))
	if err != nil {
		writeError(c, http.StatusNotFound, "project not found")
		return
	}
	if !project.Published {
		writeError(c, http.StatusNotFound, "project not found")
		return
	}
	c.JSON(http.StatusOK, project)
}

func (h *PublicHandlers) SubmitContact(c *gin.Context) {
	var req ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "invalid request body")
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Service = strings.TrimSpace(req.Service)
	req.Message = strings.TrimSpace(req.Message)
	if req.Name == "" || req.Service == "" || req.Message == "" {
		writeError(c, http.StatusBadRequest, "name, service, and message are required")
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
		IPAddress: c.ClientIP(),
		UserAgent: c.Request.UserAgent(),
	}

	id, err := h.contactRepo.Create(c.Request.Context(), submission)
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to save submission")
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id})
}
