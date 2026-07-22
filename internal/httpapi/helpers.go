package httpapi

import (
	"github.com/gin-gonic/gin"
)

func writeError(c *gin.Context, status int, message string) {
	c.JSON(status, ErrorResponse{Error: message})
}
