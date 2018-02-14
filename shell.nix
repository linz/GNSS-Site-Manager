let
  defaultPkgs = import <nixpkgs> {};
  pinnedPkgs = import (defaultPkgs.fetchFromGitHub {
    owner = "NixOS";
    repo = "nixpkgs-channels";
    rev = "e860b651d6e"; # 14 Feb 2018
    sha256 = "0bsnarxm8g1r9qhk388as78cajidd5sqmmyvhmpsqqlzb3bn7ryv";
  }) {};

in

{ nixpkgs ? pinnedPkgs }:

let
  pkgs = if nixpkgs == null then defaultPkgs else pinnedPkgs;
  devEnv = with pkgs; buildEnv {
    name = "devEnv";
    paths = [
      awscli
      chromium
      nodejs-8_x # 8.9.4, given the above pinned version of nixpkgs
      xvfb_run
      pythonPackages.docker_compose
      xorg.xhost
      chromedriver
    ];
  };
in
  pkgs.runCommand "setupEnv" {
    buildInputs = [
      devEnv
    ];
    shellHook = ''
      export PATH=./node_modules/.bin:$PATH
      export CHROME_BIN=$(which chromium)
      export CHROMEDRIVER_BIN=$(which chromedriver)
      xhost +
    '';
  } ""
