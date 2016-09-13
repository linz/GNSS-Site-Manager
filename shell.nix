let
  pkgs = import <nixpkgs> {};
  nodejs = with pkgs; buildEnv {
    name = "nodejs";
    paths = [
      nodejs-6_x
      awscli
    ];
  };
in
  pkgs.runCommand "setupEnv" {
    buildInputs = [
      nodejs
    ];
    shellHook = ''
      if [[ -e ./node_modules ]]; then
        export PATH=./node_modules/.bin:$PATH
      fi
    '';
  } ""

