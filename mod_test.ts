import { assertEquals } from '@std/assert'
import { run } from './cli.ts'
import * as card from './mod.ts'
import { assertCardContract } from './tests/contract.js'

const golden = {
	color: await Deno.readTextFile('./tests/fixtures/card.color.txt'),
	plain: await Deno.readTextFile('./tests/fixtures/card.plain.txt'),
}

Deno.test('card matches the shared rendering contract', () => {
	assertCardContract(card, golden)
})

Deno.test('CLI prints the card and a final newline', () => {
	let output = ''
	run((card) => output = `${card}\n`)
	assertEquals(output, `${golden.color}\n`)
})

Deno.test('CLI does not require environment permission', async () => {
	const command = new Deno.Command(Deno.execPath(), {
		args: ['run', './card.ts'],
		clearEnv: true,
	})
	const result = await command.output()

	assertEquals(result.success, true)
	assertEquals(new TextDecoder().decode(result.stdout), `${golden.color}\n`)
})

Deno.test('CLI respects NO_COLOR', async () => {
	const command = new Deno.Command(Deno.execPath(), {
		args: ['run', './card.ts'],
		clearEnv: true,
		env: { NO_COLOR: '1' },
	})
	const result = await command.output()

	assertEquals(result.success, true)
	assertEquals(new TextDecoder().decode(result.stdout), `${golden.plain}\n`)
})
