#!/bin/bash
set -e

echo "Setting up environment..."
docker network create devops-net || true

echo "Starting services with Docker Compose..."
docker compose up -d --build

echo "Waiting for services to be healthy..."
sleep 20

echo "Checking service health..."
docker compose ps
docker compose logs --tail=20

echo "Access the app at: http://localhost"
echo "Jenkins UI: http://localhost:8080"
