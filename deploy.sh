#!/usr/bin/env bash

set -e

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 env, where env is dev, test, prod, etc."
    exit 1
fi

env=$1

if [ "${env}" == "prod" ]; then
    bucket="gnss-site-manager"
else
    bucket="${env}-gnss-site-manager"
fi

aws s3 --profile geodesy rm "s3://${bucket}" --recursive
aws --profile geodesy s3 sync dist/prod "s3://${bucket}" --acl public-read
