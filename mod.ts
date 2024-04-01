import * as c from "@std/fmt/colors";
import boxen from "npm:boxen@7.1.1";

const fullname = "Ahmed El Gabri";
const social = fullname.toLowerCase().replaceAll(" ", "");
const jsrUserName = fullname.toLowerCase().split(" ").at(0);
const domain = fullname.toLowerCase().split(" ").at(-1);

const handle = c.blue(social);
const work = c.reset(`Staff Software Engineer ${c.yellow("@Mirohq")}`);
const twitter = c.blue(`https://twitter.com/${handle}`);
const github = c.blue(`https://github.com/${handle}`);
const linkedin = c.blue(`https://linkedin.com/in/${handle}`);
const web = c.blue(`https://${domain}.me`);
const npx = c.reset(`npx ${handle}@latest`);
const deno = c.reset(
  `deno run -r --allow-env jsr:@${c.blue(jsrUserName as string)}/card`,
);
const labelWork = c.gray("      Work: ");
const labelTwitter = c.dim(" Twitter/X: ");
const labelGitHub = c.dim("    GitHub: ");
const labelLinkedIn = c.dim("  LinkedIn: ");
const labelWeb = c.dim("       Web: ");
const labelNode = c.gray("      Node: ");
const labelDeno = c.gray("      Deno: ");

const working = `${labelWork} ${work}`;
const twittering = `${labelTwitter} ${twitter}`;
const githubing = `${labelGitHub} ${github}`;
const linkedining = `${labelLinkedIn} ${linkedin}`;
const webing = `${labelWeb} ${web}`;
const npming = `${labelNode} ${npx}`;
const denoing = `${labelDeno} ${deno}`;

const output =
  `${working}\n\n${githubing}\n${linkedining}\n${twittering}\n${webing}\n\n${denoing}\n${npming}`;

/**
 * Returns a boxed and colored personal card containing personal information
 *
 * @returns {string}
 */
export function getCard(): string {
  return boxen(output, {
    title: fullname,
    padding: 1,
    margin: 5,
    borderStyle: "round",
    borderColor: Deno.env.get("NO_COLOR") ? undefined : "blue",
  });
}

// Needed for deno run ...
// card.ts is needed for npx ...
if (import.meta.main) {
  console.log(getCard());
}
