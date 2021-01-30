#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR/../
git pull
npm i
pushd front
../node_modules/.bin/gulp
popd
./node_modules/.bin/forever stopall
./node_modules/.bin/forever start --minUptime 1000 --spinSleepTime 1000 -c node_modules/ts-node/dist/bin.js socket/src/server.ts
./node_modules/.bin/forever list
popd
