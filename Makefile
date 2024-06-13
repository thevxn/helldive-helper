#
# kpu-fe / Makefile
#

#
# VARS
#

# load example variables/constants, override by .env file if exists
# include .env.example
# -include .env

IMAGE_NAME=helldive-helper
PACKAGE_VERSION=$(shell jq -r .version package.json) 

APP_ENVIRONMENT?=development
DOCKER_COMPOSE_FILE?=./docker-compose.yml
DOCKER_COMPOSE_FILE_DEV?=./docker-compose.dev.yml
DOCKER_COMPOSE_FILE_E2E?=./docker-compose.test.yml

# define standard colors
# https://gist.github.com/rsperl/d2dfe88a520968fbc1f49db0a29345b9
ifneq (,$(findstring xterm,${TERM}))
	BLACK        := $(shell tput -Txterm setaf 0)
	RED          := $(shell tput -Txterm setaf 1)
	GREEN        := $(shell tput -Txterm setaf 2)
	YELLOW       := $(shell tput -Txterm setaf 3)
	LIGHTPURPLE  := $(shell tput -Txterm setaf 4)
	PURPLE       := $(shell tput -Txterm setaf 5)
	BLUE         := $(shell tput -Txterm setaf 6)
	WHITE        := $(shell tput -Txterm setaf 7)
	RESET        := $(shell tput -Txterm sgr0)
else
	BLACK        := ""
	RED          := ""
	GREEN        := ""
	YELLOW       := ""
	LIGHTPURPLE  := ""
	PURPLE       := ""
	BLUE         := ""
	WHITE        := ""
	RESET        := ""
endif

export


#
# TARGETS
#

.PHONY: build
build: 
	@echo -e "\n${YELLOW} Building project (docker compose build)... ${RESET}\n"
	@IMAGE_NAME=${IMAGE_NAME} PACKAGE_VERSION=${PACKAGE_VERSION} REGISTRY_URL=$(registryUrl) APP_NAME=$(appName) docker compose --file $(DOCKER_COMPOSE_FILE) build

.PHONY: push-image
push-image:
	@echo -e "\n${YELLOW} Pushing to image registry... ${RESET}\n"
	@docker push $(registryUrl)/$(appName)/${IMAGE_NAME}:${PACKAGE_VERSION}

.PHONY: run
run:
	@echo -e "\n${YELLOW} Starting project (docker compose up)... ${RESET}\n"
	@docker login -u $(login) -p $(password) $(registryUrl)
	@IMAGE_NAME=${IMAGE_NAME} PACKAGE_VERSION=${PACKAGE_VERSION} REGISTRY_URL=$(registryUrl) APP_NAME=$(appName) docker compose --file $(DOCKER_COMPOSE_FILE) up $(services) --force-recreate --remove-orphans --detach

.PHONY: dev
dev:
	@echo -e "\n${YELLOW} Starting project in local dev mode (docker compose up)... ${RESET}\n"
	@docker compose --file $(DOCKER_COMPOSE_FILE_DEV) up --force-recreate --remove-orphans

.PHONY: stop
stop:  
	@echo -e "\n${YELLOW} Stopping and purging project (docker compose down)... ${RESET}\n"
	@docker compose --file $(DOCKER_COMPOSE_FILE) down

.PHONY: logs
logs:
	@echo -e "\n${YELLOW} Fetching container's logs (CTRL-C to exit)... ${RESET}\n"
	@docker logs ${DOCKER_CONTAINER_NAME} --follow

.PHONY: sh
sh:
	@echo -e "\n${YELLOW} Attaching container's shell (CTRL-D to exit)... ${RESET}\n"
	@docker exec -it ${DOCKER_CONTAINER_NAME} sh