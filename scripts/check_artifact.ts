import { assert, assertEquals } from '@std/assert'

const packageJson = JSON.parse(await Deno.readTextFile('./npm/package.json'))
assertEquals(packageJson.type, 'module')
assertEquals(packageJson.dependencies, undefined)
assertEquals(packageJson.exports['.'].require, undefined)

const forbidden = [
	['CommonJS require', /\brequire\s*\(/],
	['CommonJS exports', /\bmodule\.exports\b/],
	['Node built-in specifier', /['"]node:[^'"]*['"]/],
	['Deno shim', /@deno\/shim/],
] as const

for await (const entry of Deno.readDir('./npm/dist')) {
	assert(
		!entry.name.endsWith('.cjs'),
		`Unexpected CommonJS file: ${entry.name}`,
	)
	if (!entry.isFile || !entry.name.endsWith('.js')) continue

	const source = await Deno.readTextFile(`./npm/dist/${entry.name}`)
	for (const [label, pattern] of forbidden) {
		assert(!pattern.test(source), `${label} found in npm/dist/${entry.name}`)
	}
}
