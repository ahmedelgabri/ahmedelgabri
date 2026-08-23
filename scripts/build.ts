import { assert } from '@std/assert'
import * as semver from '@std/semver'

const config = JSON.parse(await Deno.readTextFile('./deno.jsonc'))
const requestedVersion = Deno.args[0] ?? config.version
const parsedVersion = semver.tryParse(requestedVersion)
assert(parsedVersion, `Invalid version: ${requestedVersion}`)
const version = semver.format(parsedVersion)

try {
	await Deno.remove('./npm', { recursive: true })
} catch (error) {
	if (!(error instanceof Deno.errors.NotFound)) throw error
}

const compile = new Deno.Command(Deno.execPath(), {
	args: [
		'run',
		'-A',
		'npm:typescript@5.9.3/bin/tsc',
		'--project',
		'./tsconfig.build.json',
	],
	stdin: 'inherit',
	stdout: 'inherit',
	stderr: 'inherit',
})
assert((await compile.output()).success, 'TypeScript compilation failed')

const packageJson = {
	name: 'ahmedelgabri',
	version,
	description: 'A personal card for Ahmed El Gabri (@ahmedelgabri)',
	type: 'module',
	types: './dist/mod.d.ts',
	exports: {
		'.': {
			types: './dist/mod.d.ts',
			default: './dist/mod.js',
		},
		'./cli': {
			types: './dist/cli.d.ts',
			default: './dist/cli.js',
		},
		'./package.json': './package.json',
	},
	bin: {
		ahmedelgabri: 'dist/card.js',
	},
	engines: {
		node: '>=22',
	},
	sideEffects: false,
	keywords: ['card', 'npm', 'npm card', 'npx', 'npx card', 'business card'],
	author: {
		name: 'Ahmed El Gabri',
		email: 'ahmed@gabri.me',
		url: 'https://gabri.me',
	},
	repository: {
		type: 'git',
		url: 'git+https://github.com/ahmedelgabri/ahmedelgabri.git',
	},
	bugs: {
		url: 'https://github.com/ahmedelgabri/ahmedelgabri/issues',
	},
	license: 'MIT',
}

await Promise.all([
	Deno.writeTextFile(
		'./npm/package.json',
		`${JSON.stringify(packageJson, null, 2)}\n`,
	),
	Deno.copyFile('./LICENSE', './npm/LICENSE'),
	Deno.copyFile('./README.md', './npm/README.md'),
])
