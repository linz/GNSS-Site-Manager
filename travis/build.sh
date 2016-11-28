#!/usr/bin/env nix-shell
#!nix-shell ../shell.nix -i bash

set -e

npm install
typings install
xvfb-run npm run test

if [ "${TRAVIS_PULL_REQUST}" = "false" ]; then
    npm run build.prod -- --config-env test
    aws configure set aws_access_key_id "${TRAVIS_AWS_ACCESS_KEY_ID}" --profile geodesy
    aws configure set aws_secret_access_key "${TRAVIS_AWS_SECRET_KEY_ID}" --profile geodesy
    aws configure set region ap-southeast-2 --profile geodesy
    aws configure set output json --profile geodesy
    npm run deploy.dev
fi
