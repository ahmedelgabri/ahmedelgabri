import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: [
    "./mod.ts",
    {
      kind: "bin",
      name: "ahmedelgabri",
      path: "./card.ts",
    },
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  declaration: "separate",
  scriptModule: "cjs",
  typeCheck: "both",
  test: false,
  importMap: "deno.json",
  package: {
    name: "ahmedelgabri",
    version: Deno.args[0],
    license: "MIT",
    description: "A personal card for Ahmed El Gabri (@ahmedelgabri)",
    repository: {
      type: "git",
      url: "git+https://github.com/ahmedelgabri/ahmedelgabri.git",
    },
    bugs: {
      url: "https://github.com/ahmedelgabri/ahmedelgabri/issues",
    },
    author: {
      name: "Ahmed El Gabri",
      email: "ahmed@gabri.me",
      url: "https://gabri.me",
    },
    keywords: ["card", "npm", "npm card", "npx", "npx card", "business card"],
  },
  async postBuild() {
    await Deno.copyFile("LICENSE", "npm/LICENSE");
    await Deno.copyFile("README.md", "npm/README.md");
  },
});
