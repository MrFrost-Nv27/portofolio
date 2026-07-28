package httpapi

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"portofolio/internal/auth"
	"portofolio/internal/models"
	"portofolio/internal/repository"
)

const adminUserContextKey = "adminUser"

// RequireAdminAuth reads the session cookie, resolves it to an admin user,
// and rejects the request with 401 if missing/expired. On success the
// admin user is stashed in the Gin context for handlers to read via
// currentAdminUser(c).
func RequireAdminAuth(authRepo *repository.AuthRepo) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie(auth.SessionCookieName)
		if err != nil || token == "" {
			writeError(c, http.StatusUnauthorized, "authentication required")
			c.Abort()
			return
		}

		user, err := authRepo.GetSessionUser(c.Request.Context(), token)
		if err != nil {
			writeError(c, http.StatusUnauthorized, "authentication required")
			c.Abort()
			return
		}

		c.Set(adminUserContextKey, user)
		c.Next()
	}
}

func currentAdminUser(c *gin.Context) *models.AdminUser {
	v, ok := c.Get(adminUserContextKey)
	if !ok {
		return nil
	}
	u, _ := v.(*models.AdminUser)
	return u
}
