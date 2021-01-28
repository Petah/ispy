#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR/../server/
PHP_CLI_SERVER_WORKERS=$(getconf _NPROCESSORS_ONLN)
php74 artisan serve --port=9511 --host=0.0.0.0
popd
