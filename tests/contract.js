function assertEquals(actual, expected, label) {
	if (actual !== expected) {
		throw new Error(
			`${label} differs from the golden output: expected ${expected.length} characters, received ${actual.length}`,
		)
	}
}

/**
 * Runs the shared card contract against a runtime's imported package artifact.
 *
 * @param {{ getCard(options?: { color?: boolean }): string }} card
 * @param {{ color: string, plain: string }} golden
 * @returns {void}
 */
export function assertCardContract(card, golden) {
	assertEquals(card.getCard(), golden.color, 'default output')
	assertEquals(card.getCard({ color: true }), golden.color, 'colored output')
	assertEquals(card.getCard({ color: false }), golden.plain, 'plain output')

	if (card.getCard({ color: false }).includes('\x1b[')) {
		throw new Error('plain output contains ANSI escape sequences')
	}
}
