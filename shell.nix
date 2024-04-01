with import <nixpkgs> { };
mkShell {
  # name = "";
  buildInputs = [ deno nodejs ];
}
