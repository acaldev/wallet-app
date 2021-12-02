#!/bin/bash

BOLD='\033[1m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
NC='\033[0m' # No Color

# build all containers
function buildContainers {
    echo -e ""
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e " ${BOLD}APP BUILD${NC}"
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e ""
    docker-compose build
}

# start all containers
function startContainers {
    echo -e ""
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e " ${BOLD}APP START${NC}"
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e ""
    docker-compose up -d
}

# start all containers
function startAndLogContainers {
    echo -e ""
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e " ${BOLD}APP START & LOG${NC}"
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e ""
    docker-compose up
}

# stop all containers
function stopContainers {
    echo -e ""
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e " ${BOLD}APP STOP${NC}"
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e ""
    docker-compose down
}

# help
function helpCommand {
    echo -e ""
    echo -e " ${LIGHTBLUE}-----------------------------------------------------------------${NC}"
    echo -e " ${BOLD}Main commands:${NC}"
    echo -e ""
    echo -e "   ${YELLOW}build${NC}"
    echo -e "       - Build app"
    echo -e "   ${YELLOW}start${NC}"
    echo -e "       - Starts all app services app"
    echo -e "   ${YELLOW}stop${NC}"
    echo -e "       - Stops all app services"
    echo -e ""
    echo -e ""
}

# ARGS

if [ "$1" = "build" ]; then
    buildContainers
    exit
fi

if [ "$1" = "start" ]; then
    startContainers
    exit
fi

if [ "$1" = "startAndLog" ]; then
    startAndLogContainers
    exit
fi

if [ "$1" = "stop" ]; then
    stopContainers
    exit
fi
