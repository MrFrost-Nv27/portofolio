package httpapi

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"portofolio/internal/models"
	"portofolio/internal/repository"
)

// ContactController handles the public contact form submission.
type ContactController struct {
	repo *repository.ContactRepo
}

func NewContactController(repo *repository.ContactRepo) *ContactController {
	return &ContactController{repo: repo}
}

// Store handles POST /api/contact.
func (ctl *ContactController) Store(c *gin.Context) {
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

	id, err := ctl.repo.Create(c.Request.Context(), submission)
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to save submission")
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id})
}
