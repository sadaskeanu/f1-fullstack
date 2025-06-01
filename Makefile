# Makefile for f1-fullstack project

# Variables
PROJECT_NAME=f1-fullstack
COMPOSE=docker compose
COMPOSE_FILE=docker-compose.yml

# Commands

.PHONY: up down restart logs build prune lint test push

## Start all containers with build
up:
	$(COMPOSE) up --build

## Stop all containers
down:
	$(COMPOSE) down

## Rebuild and restart containers
restart:
	$(COMPOSE) down --volumes
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

## View logs from all containers
logs:
	$(COMPOSE) logs -f

## Build all images
build:
	$(COMPOSE) build

## Remove all stopped containers, networks, volumes, and images
prune:
	docker system prune -af --volumes

## Run backend linter
lint:
	cd server && npm run lint

## Run backend tests
test:
	cd server && npm test

## Push images to Docker Hub (must be logged in)
push:
	docker push sadaskeanu/f1-backend:latest
	docker push sadaskeanu/f1-frontend:latest


setup-env:
	cp .env.example .env || true
	cp server/.env.example server/.env || true
	cp client/.env.example client/.env || true
