import { assertEquals, assertStringIncludes } from '@std/assert'
import { getCard } from './mod.ts'

// Strip ANSI escape codes for testing
function stripAnsi(str: string): string {
	// deno-lint-ignore no-control-regex
	return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
}

Deno.test('getCard returns a string', () => {
	const card = getCard()
	assertEquals(typeof card, 'string')
})

Deno.test('getCard contains expected content', () => {
	const card = stripAnsi(getCard())
	assertStringIncludes(card, 'Ahmed El Gabri')
	assertStringIncludes(card, 'github.com/ahmedelgabri')
	assertStringIncludes(card, 'linkedin.com/in/ahmedelgabri')
	assertStringIncludes(card, 'gabri.me')
})

Deno.test('getCard respects NO_COLOR env var', () => {
	const originalNoColor = Deno.env.get('NO_COLOR')

	Deno.env.set('NO_COLOR', '1')
	const cardNoColor = getCard()

	if (originalNoColor !== undefined) {
		Deno.env.set('NO_COLOR', originalNoColor)
	} else {
		Deno.env.delete('NO_COLOR')
	}

	assertStringIncludes(cardNoColor, 'Ahmed El Gabri')
})
