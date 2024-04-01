import * as path from "@std/path";
import * as a from "@std/assert";
import * as semver from "@std/semver";
import * as clrs from "@std/fmt/colors";

type Data = {
  label: string;
  cmd: string[];
};

const decoder = new TextDecoder();

async function run(data: Data) {
  const {
    label,
    cmd: [c, ...args],
  } = data;
  console.log(`${clrs.yellow("-> ")}${clrs.blue(label)}`);
  const command = new Deno.Command(c, { args });
  const p = await command.output();

  console.log(decoder.decode(p.stderr), decoder.decode(p.stdout));
  a.assert(p.success, `${label}\n${decoder.decode(p.stderr)}`);
}

const validVersion = semver.tryParse(Deno.args[0]);
a.assert(validVersion, `Invalid version! ${Deno.args[0]}`);

const version = semver.format(validVersion);

const file = path.resolve("./deno.json");
const Config = JSON.parse(await Deno.readTextFile(file));

await run({
  label: "build npm package",
  cmd: ["deno", "task", "build", version],
});

Config.version = version;
const contents = JSON.stringify(Config, null, 2);
await Deno.writeTextFile(file, contents);

// prevent CI error
await run({
  label: "deno fmt",
  cmd: ["deno", "fmt", file],
});

await run({
  label: "publish npm package",
  cmd: ["deno", "task", "publish:npm", Deno.args[1]],
});

await run({
  label: "publish jsr package",
  cmd: ["deno", "publish", "--allow-dirty"],
});

await run({
  label: "git add",
  cmd: ["git", "add", file],
});

await run({
  label: "git commit",
  cmd: ["git", "commit", "-m", version],
});

await run({
  label: "git tag",
  cmd: ["git", "tag", `v${version}`],
});

await run({
  label: "git push",
  cmd: ["git", "push", "origin", "main", "--tags"],
});
