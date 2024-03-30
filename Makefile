#
# kpu-fe / Makefile
#

#
# VARS
#

# load example variables/constants, override by .env file if exists
# include .env.example
# -include .env

APP_ENVIRONMENT?=development
PROJECT_NAME?=${APP_NAME}
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

.PHONY: info
info: 
	@echo -e "\n${GREEN} ${PROJECT_NAME} / Makefile ${RESET}\n"

	@echo -e "${YELLOW} make --- show this helper ${RESET}\n"

	@echo -e "${YELLOW} make build --- build project (docker image) ${RESET}"
	@echo -e "${YELLOW} make run   --- run project ${RESET}"
	@echo -e "${YELLOW} make stop  --- stop and purge project (only docker containers!) ${RESET}\n"

	@echo -e "${YELLOW} make logs  --- fetch container's logs ${RESET}"
	@echo -e "${YELLOW} make sh    --- enter container's shell ${RESET}\n"

.PHONY: version
version: 
	@echo -e "\n${YELLOW} Updating app's version (docs) according to dot-env file... ${RESET}\n"
	@sed -i 's/\(\/\/[ ]@version\) .*/\1 ${APP_VERSION}/' main.go

.PHONY: build
build: 
	@echo -e "\n${YELLOW} Building project (docker compose build)... ${RESET}\n"
	@docker compose --file $(DOCKER_COMPOSE_FILE) build

.PHONY: run
run:
	@echo -e "\n${YELLOW} Starting project (docker compose up)... ${RESET}\n"
	@docker compose --file $(DOCKER_COMPOSE_FILE) up --force-recreate --remove-orphans --detach

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


.PHONY: push
push:
	@echo -e "\n${YELLOW} (re)tagging project and pushing to master... ${RESET}\n"
	@git tag -fa v${APP_VERSION} -m "v${APP_VERSION}"
	@git push --follow-tags origin master

.PHONY: e2e
e2e:
	@echo -e "\n${YELLOW} Running E2E Tests... ${RESET}\n"
	@docker compose --file $(DOCKER_COMPOSE_FILE_E2E) up

# .PHONY: e2e-decompose
# e2e-decompose:
# 	@echo -e "\n${YELLOW} Decomposing E2E Test container... ${RESET}\n"
# 	@docker compose --file $(DOCKER_COMPOSE_FILE_E2E) down