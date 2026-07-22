package httpapi

// ContactRequest is the JSON body for POST /api/contact.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Service string `json:"service"`
	Message string `json:"message"`
	Locale  string `json:"locale"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
