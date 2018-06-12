#!/usr/bin/env bash

set -e

if [[ $# -le 1 ]]; then
    echo "Usage: $0 env, where env is dev, test, prod, etc."
    exit 1
fi

env=$1
bucket="sitelog${env}-cloudfront-s3"

 
aws s3 --profile $2 rm "s3://${bucket}" --recursive
aws --profile $2 s3 sync dist/prod "s3://${bucket}" --acl public-read
