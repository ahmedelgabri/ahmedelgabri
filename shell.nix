with import <nixpkgs> { };
mkShell {
  # name = "";
  buildInputs = [ nodejs-18_x nodePackages.pnpm ];
}
