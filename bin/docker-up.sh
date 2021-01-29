#!/bin/bash

# Variables
SRC_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOCKER_DIR="$SRC_DIR/../docker"

# Action
pushd $DOCKER_DIR > /dev/null
docker-compose --env-file ../config/local/.env up --build  --force-recreate --remove-orphans -d
popd > /dev/null