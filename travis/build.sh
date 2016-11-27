#!/usr/bin/env nix-shell
#!nix-shell ../shell.nix -i bash

set -e

npm install
typings install
xvfb-run npm run test

