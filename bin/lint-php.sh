#!/usr/bin/env bash

# Typography
COLOR_RED='\033[1;32m'
COLOR_INITIAL='\033[0m'

# Variables
SRC_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONFIG_FILE=$SRC_DIR/lint-php.config.php

# Action
pushd $SRC_DIR/../server
printf "${COLOR_RED}> Linting PHP files${COLOR_INITIAL}\n"
php ./vendor/bin/php-cs-fixer fix --config=$CONFIG_FILE $@
popd
