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
	const defaultOutput = card.getCard()
	const coloredOutput = card.getCard({ color: true })
	const plainOutput = card.getCard({ color: false })

	assertEquals(defaultOutput, golden.color, 'default output')
	assertEquals(coloredOutput, golden.color, 'colored output')
	assertEquals(plainOutput, golden.plain, 'plain output')

	if (plainOutput.includes('\x1b[')) {
		throw new Error('plain output contains ANSI escape sequences')
	}
}
