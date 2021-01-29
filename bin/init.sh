#!/bin/bash

# Variables
SRC_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LARAVEL_DIR="$SRC_DIR/../laravel"

# Clone Laravel
pushd $LARAVEL_DIR > /dev/null
mkdir temp 
cd temp
git clone https://github.com/laravel/laravel.git .
rm -rf .git
rm -rf .env
rm -rf /public/.htaccess
cp -aR ./ ../
cd ..
rm -rf temp
popd > /dev/null

# Load docker
pushd $SRC_DIR > /dev/null
./docker-up.sh
popd > /dev/null

# Init project depencies
pushd $LARAVEL_DIR > /dev/null
./composer update
./php-artisan migrate
popd > /dev/null