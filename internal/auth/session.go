package auth

import (
	"crypto/rand"
	"encoding/base64"
)

const SessionCookieName = "portfolio_admin_session"

// NewSessionToken returns a random 32-byte, base64url-encoded token.
// The token itself is the session's lookup key — no separate signing is needed
// since possessing the token is the only credential required.
func NewSessionToken() (string, error) {
	buf := make([]byte, 32)
	if _, err := rand.Read(buf); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(buf), nil
}
