package httpapi

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"portofolio/internal/repository"
)

// ProjectController serves the published-projects resource (portfolio grid
// + detail view). Admin-only mutation endpoints (create/update/delete,
// unpublished listing) live in a separate AdminProjectController once the
// admin panel is built, mirroring how Laravel keeps public and admin
// controllers for the same model apart.
type ProjectController struct {
	repo *repository.ProjectsRepo
}

func NewProjectController(repo *repository.ProjectsRepo) *ProjectController {
	return &ProjectController{repo: repo}
}

// Index handles GET /api/projects?category=.
func (ctl *ProjectController) Index(c *gin.Context) {
	category := c.Query("category")
	projects, err := ctl.repo.List(c.Request.Context(), repository.ProjectFilter{
		Category:      category,
		PublishedOnly: true,
	})
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to load projects")
		return
	}
	c.JSON(http.StatusOK, projects)
}

// Show handles GET /api/projects/:id.
func (ctl *ProjectController) Show(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		writeError(c, http.StatusBadRequest, "invalid project id")
		return
	}
	project, err := ctl.repo.Get(c.Request.Context(), uint(id))
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
