package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv            string
	Port              string
	DatabaseURL       string
	CorsAllowedOrigin string
}

func Load() Config {
	appEnv := getEnv("APP_ENV", "development")

	if appEnv == "development" {
		if err := godotenv.Load(".env.development"); err != nil {
			log.Println("No .env.development file found, using system environment variables")
		}
	}

	return Config{
		AppEnv:            getEnv("APP_ENV", "development"),
		Port:              getEnv("PORT", "8080"),
		DatabaseURL:       getEnv("DATABASE_URL", ""),
		CorsAllowedOrigin: getEnv("CORS_ALLOWED_ORIGIN", "http://localhost:3000"),
	}
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)

	if value == "" {
		return fallback
	}

	return value
}