import { assert } from '@std/assert'
import * as semver from '@std/semver'

type Command = {
	label: string
	command: string
	args: string[]
	cwd?: string
}

async function run({ label, command, args, cwd }: Command): Promise<void> {
	console.log(`-> ${label}`)
	const result = await new Deno.Command(command, {
		args,
		cwd,
		stdin: 'inherit',
		stdout: 'inherit',
		stderr: 'inherit',
	}).output()
	assert(result.success, label)
}

const parsedVersion = semver.tryParse(Deno.args[0])
assert(parsedVersion, `Invalid version: ${Deno.args[0]}`)
const version = semver.format(parsedVersion)
const npmArgs = ['publish', ...Deno.args.slice(1)]

const configPath = './deno.jsonc'
const configContents = await Deno.readTextFile(configPath)
const config = JSON.parse(configContents)
const currentVersion = `\t"version": "${config.version}",`
assert(configContents.includes(currentVersion), 'Version field not found')

if (config.version !== version) {
	await Deno.writeTextFile(
		configPath,
		configContents.replace(currentVersion, `\t"version": "${version}",`),
	)
}

await run({
	label: 'format release metadata',
	command: 'deno',
	args: ['fmt', configPath],
})
await run({
	label: 'run tests',
	command: 'deno',
	args: ['task', 'test'],
})
await run({
	label: 'build and test npm package in all runtimes',
	command: 'deno',
	args: ['task', 'test:runtimes'],
})
await run({
	label: 'validate npm package',
	command: 'deno',
	args: ['task', 'check:package'],
})
await run({
	label: 'validate JSR package',
	command: 'deno',
	args: ['publish', '--dry-run', '--allow-dirty'],
})
await run({
	label: 'publish npm package',
	command: 'npm',
	args: npmArgs,
	cwd: './npm',
})
await run({
	label: 'publish JSR package',
	command: 'deno',
	args: ['publish', '--allow-dirty'],
})
await run({
	label: 'describe release',
	command: 'jj',
	args: ['describe', '-m', version],
})
await run({
	label: 'advance main bookmark',
	command: 'jj',
	args: ['bookmark', 'set', 'main', '-r', '@'],
})
await run({
	label: 'create release tag',
	command: 'jj',
	args: ['tag', 'set', `v${version}`, '-r', '@'],
})
await run({
	label: 'push release',
	command: 'jj',
	args: ['git', 'push', '--bookmark', 'main', '--tag', `v${version}`],
})
