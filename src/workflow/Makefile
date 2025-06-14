.PHONY: install run test clean dashboard init-dapr stop-dapr

# Application name and settings
APPNAME=daprOrderProcessingWorkflow
APPNAME_LOWER=daprorderprocessingworkflow-app
DAPR_APP_ID=daprorderprocessingworkflow-app
APP_PORT=8080
DAPR_HTTP_PORT=3684
DAPR_GRPC_PORT=50380

# Check if Node.js is installed
init: ## Check Node.js installation and install dependencies
	@command -v bun >/dev/null 2>&1 || { echo "bun is not installed. Please install bun from https://bun.sh/"; exit 1; }
	@echo "bun is installed:"
	@bun --version
	@bun install

# Check if Dapr is installed
check-dapr: ## Check if Dapr is installed
	@command -v dapr >/dev/null 2>&1 && { echo "Dapr CLI is installed"; exit 0; } || { echo "Dapr is not installed. Please install it from https://docs.dapr.io/getting-started/install-dapr-cli/"; exit 1; }

# Initialize Dapr if not already initialized
init-dapr: check-dapr ## Initialize Dapr
	@dapr version -o json | grep 'Runtime version":"n/a"' && dapr init --dev --runtime-version 1.15.4 || \
		{ echo "Dapr Server is installed"; dapr version; exit 0; }

setup: init-dapr init ## Setup development environment
	@echo "Development environment is set up successfully"

# Build the application
build: init ## Build the application
	@echo "Building application..."
	@bun build

# Install dependencies
install: ## Install dependencies
	@echo "Installing dependencies..."
	@bun install

# Run tests
test: ## Run tests
	@echo "Running tests..."
	@bun test

# Clean up
clean: ## Clean build artifacts
	@echo "Cleaning application..."
	@rm -rf node_modules
	@rm -rf dist

# Stop Dapr APP
stop: ## Stop Dapr application
	@echo "Stopping the Dapr application..."
	dapr stop --app-id $(DAPR_APP_ID) || true:
	# kill whoever is using the port
	@lsof -i :$(APP_PORT) | awk '{print $$2}' | grep -v PID | xargs kill -9 || true

# Wait for application to be ready
wait-for-app: ## Wait for application to initialize
	@echo "Waiting for application to initialize..."
	@echo "This may take up to 30 seconds..."
	@for i in $$(seq 1 15); do \
		HTTP_STATUS=$$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$(APP_PORT)/health || echo "000"); \
		if [ "$$HTTP_STATUS" = "204" ] || [ "$$HTTP_STATUS" = "200" ]; then \
			echo "Application is up! (HTTP status: $$HTTP_STATUS)"; \
			break; \
		else \
			echo "Waiting for application to start... ($$i/15) Status: $$HTTP_STATUS"; \
			sleep 2; \
		fi; \
	done    

# Start a workflow
start-workflow: wait-for-app ## Start a workflow with optional JSON input
	@if [ -z "$(JSON_INPUT)" ]; then \
		echo "Running workflow with empty input.\nTo provide a custom input, pass JSON_INPUT like: make start-workflow JSON_INPUT='{\"some_key\": \"some_value\"}'.\n"; \
	fi
	@echo "Starting a new workflow instance..."
	curl -s -X POST http://localhost:$(APP_PORT)/api/workflow/start \
		-H "Content-Type: application/json" -d '$(JSON_INPUT)' | cat

# Check the status of a workflow
check-workflow: ## Check workflow status (requires INSTANCE_ID=<workflow_id>)
	@if [ -z "$(INSTANCE_ID)" ]; then \
		echo "Error: Workflow ID is required. Usage: make check-workflow INSTANCE_ID=<workflow_id>"; \
		exit 1; \
	fi
	@curl -s -H "Accept: application/json" http://localhost:$(APP_PORT)/api/workflow/$(INSTANCE_ID)

# Raise an event to a workflow
raise-event: ## Raise an event to a workflow (requires EVENT_LABEL_NAME and INSTANCE_ID)
	@if [ -z "$(EVENT_LABEL_NAME)" ] || [ -z "$(INSTANCE_ID)" ]; then \
		echo "Error: EVENT_LABEL_NAME and INSTANCE_ID are required. Usage: make raise-event EVENT_LABEL_NAME=<event> INSTANCE_ID=<instance_id> [EVENT_DATA='{\"key\":\"value\"}']"; \
		exit 1; \
	fi
	@echo "Raising event '$(EVENT_LABEL_NAME)' for workflow instance '$(INSTANCE_ID)'..."
	curl -X POST http://localhost:$(APP_PORT)/api/workflow/$(INSTANCE_ID)/event/$(EVENT_LABEL_NAME) \
		-H "Content-Type: application/json" \
		-d '$(EVENT_DATA)'

# Start Dapr APP
start: build ## Start application with Dapr
	@echo "Starting the application with Dapr..."
	echo "Using Dapr HTTP port: $(DAPR_HTTP_PORT)"; \
	echo "Using Dapr gRPC port: $(DAPR_GRPC_PORT)"; \
	dapr run -f ./dapr.yaml

# Display help information
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Default target
.DEFAULT_GOAL := help