package httpapi

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"portofolio/internal/repository"
)

// ProfileController serves the singleton profile/about resource.
type ProfileController struct {
	repo *repository.ProfileRepo
}

func NewProfileController(repo *repository.ProfileRepo) *ProfileController {
	return &ProfileController{repo: repo}
}

// Show handles GET /api/profile.
func (ctl *ProfileController) Show(c *gin.Context) {
	profile, err := ctl.repo.Get(c.Request.Context())
	if err != nil {
		writeError(c, http.StatusNotFound, "profile not found")
		return
	}
	c.JSON(http.StatusOK, profile)
}
