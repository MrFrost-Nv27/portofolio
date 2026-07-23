package httpapi

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"portofolio/internal/repository"
)

// SkillsController serves the skill categories + chips resource.
type SkillsController struct {
	repo *repository.SkillsRepo
}

func NewSkillsController(repo *repository.SkillsRepo) *SkillsController {
	return &SkillsController{repo: repo}
}

// Index handles GET /api/skills.
func (ctl *SkillsController) Index(c *gin.Context) {
	categories, err := ctl.repo.ListCategories(c.Request.Context())
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to load skills")
		return
	}
	c.JSON(http.StatusOK, categories)
}
