package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dung-ngo/impactbridge/backend/config"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"status": "ok",
		"service": "impactbridge-api",
		"version": "1.0.0",
	})
}

func main() {
	cfg := config.Load()

	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", healthHandler)

	serverAddress := ":" + cfg.Port

	log.Println("Server running on http://localhost:8080" + serverAddress)
	log.Println("Environment:", cfg.AppEnv)

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}