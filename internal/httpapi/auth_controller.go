package httpapi

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"portofolio/internal/auth"
	"portofolio/internal/repository"
)

// sessionTTL is a sliding 7-day expiry — generous enough that a single
// admin doesn't get logged out mid-edit, short enough that a stolen cookie
// doesn't stay valid forever.
const sessionTTL = 7 * 24 * time.Hour

// AuthController handles admin login/logout/me. Only a single admin user
// is supported (see cmd/seed -create-admin), so there's no registration
// endpoint — deliberately, to keep the admin surface minimal.
type AuthController struct {
	repo         *repository.AuthRepo
	cookieSecure bool
}

func NewAuthController(repo *repository.AuthRepo, cookieSecure bool) *AuthController {
	return &AuthController{repo: repo, cookieSecure: cookieSecure}
}

type loginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login handles POST /api/admin/login.
func (ctl *AuthController) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		writeError(c, http.StatusBadRequest, "username and password are required")
		return
	}

	user, err := ctl.repo.GetUserByUsername(c.Request.Context(), req.Username)
	if err != nil {
		// Same message as a bad password — don't reveal whether the
		// username exists.
		writeError(c, http.StatusUnauthorized, "invalid username or password")
		return
	}
	if !auth.VerifyPassword(user.PasswordHash, req.Password) {
		writeError(c, http.StatusUnauthorized, "invalid username or password")
		return
	}

	token, err := auth.NewSessionToken()
	if err != nil {
		writeError(c, http.StatusInternalServerError, "failed to create session")
		return
	}
	if err := ctl.repo.CreateSession(c.Request.Context(), token, user.ID, time.Now().Add(sessionTTL)); err != nil {
		writeError(c, http.StatusInternalServerError, "failed to create session")
		return
	}

	ctl.setSessionCookie(c, token, int(sessionTTL.Seconds()))
	c.JSON(http.StatusOK, gin.H{"id": user.ID, "username": user.Username})
}

// Logout handles POST /api/admin/logout.
func (ctl *AuthController) Logout(c *gin.Context) {
	if token, err := c.Cookie(auth.SessionCookieName); err == nil && token != "" {
		_ = ctl.repo.DeleteSession(c.Request.Context(), token)
	}
	ctl.setSessionCookie(c, "", -1)
	c.Status(http.StatusNoContent)
}

// Me handles GET /api/admin/me (behind RequireAdminAuth) — lets the SPA
// bootstrap its auth store on load/refresh without re-submitting credentials.
func (ctl *AuthController) Me(c *gin.Context) {
	user := currentAdminUser(c)
	if user == nil {
		writeError(c, http.StatusUnauthorized, "authentication required")
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": user.ID, "username": user.Username})
}

func (ctl *AuthController) setSessionCookie(c *gin.Context, value string, maxAgeSeconds int) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(auth.SessionCookieName, value, maxAgeSeconds, "/", "", ctl.cookieSecure, true)
}
