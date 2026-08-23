import { assert, assertEquals } from '@std/assert'

const decoder = new TextDecoder()
const golden = {
	color: await Deno.readTextFile('./tests/fixtures/card.color.txt'),
	plain: await Deno.readTextFile('./tests/fixtures/card.plain.txt'),
}

const runtimes = [
	{
		name: 'Deno',
		command: Deno.execPath(),
		testArgs: ['run', '--allow-read', './tests/runtime.mjs'],
		cliArgs: ['run', './npm/dist/card.js'],
	},
	{
		name: 'Node.js',
		command: 'node',
		testArgs: ['./tests/runtime.mjs'],
		cliArgs: ['./npm/dist/card.js'],
	},
	{
		name: 'Bun',
		command: 'bun',
		testArgs: ['./tests/runtime.mjs'],
		cliArgs: ['./npm/dist/card.js'],
	},
]

for (const runtime of runtimes) {
	const contract = await new Deno.Command(runtime.command, {
		args: runtime.testArgs,
	}).output()
	assert(
		contract.success,
		`${runtime.name} contract failed: ${decoder.decode(contract.stderr)}`,
	)

	for (
		const [label, noColor, expected] of [
			['colored', false, golden.color],
			['plain', true, golden.plain],
		] as const
	) {
		const cli = await new Deno.Command(runtime.command, {
			args: runtime.cliArgs,
			clearEnv: true,
			env: noColor ? { NO_COLOR: '1' } : {},
		}).output()
		assert(
			cli.success,
			`${runtime.name} ${label} CLI failed: ${decoder.decode(cli.stderr)}`,
		)
		assertEquals(
			decoder.decode(cli.stdout),
			`${expected}\n`,
			`${runtime.name} ${label} CLI output differs`,
		)
	}
}
