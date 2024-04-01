import * as c from "@std/fmt/colors";
import boxen from "npm:boxen@7.1.1";

const fullname = "Ahmed El Gabri";
const social = fullname.toLowerCase().replaceAll(" ", "");
const mastodonHandle = fullname.toLowerCase().split(" ").at(-1);
const jsrUserName = fullname.toLowerCase().split(" ").at(0);

// Text + pc definitions
const handle = c.blue(social);
const work = c.reset("Staff Software Engineer @MiroHQ");
const twitter = c.blue(`https://twitter.com/${handle}`);
const github = c.blue(`https://github.com/${handle}`);
const linkedin = c.blue(`https://linkedin.com/in/${handle}`);
const mastodon = c.blue(`https://mastodon.online/@${mastodonHandle}`);
const web = c.blue("https://gabri.me");
const npx = c.reset(`npx ${handle}`);
const deno = c.reset(
  `deno run --allow-env jsr:@${c.blue(jsrUserName as string)}/card`,
);
const labelWork = c.gray("      Work: ");
const labelTwitter = c.dim(" Twitter: ");
const labelGitHub = c.dim("  GitHub: ");
const labelLinkedIn = c.dim("LinkedIn: ");
const labelWeb = c.dim("     Web: ");
const labelNode = c.gray("    Node: ");
const labelDeno = c.gray("    Deno: ");
const labelMastodon = c.dim("Mastodon: ");

// Actual strings we're going to output
const working = `${labelWork} ${work}`;
const twittering = `${labelTwitter} ${twitter}`;
const githubing = `${labelGitHub} ${github}`;
const linkedining = `${labelLinkedIn} ${linkedin}`;
const webing = `${labelWeb} ${web}`;
const npming = `${labelNode} ${npx}`;
const denoing = `${labelDeno} ${deno}`;
const mastodoning = `${labelMastodon} ${mastodon}`;

// Put all our output together into a single variable so we can use boxen effectively
const output = `${working}

  ${githubing}
  ${linkedining}
  ${twittering}
  ${mastodoning}
  ${webing}

  ${denoing}
  ${npming}`;

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

/**
 * Returns personal card containing personal information without ascii art or
 * colors
 *
 * @returns {string}
 */
export function getPlainCard(): string {
  return output;
}

if (import.meta.main) {
  console.log(getCard());
}
