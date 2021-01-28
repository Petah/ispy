#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR/../server/
php74 artisan queue:listen --no-ansi --tries=5 --sleep=1 --memory=900 --timeout=300
popd
