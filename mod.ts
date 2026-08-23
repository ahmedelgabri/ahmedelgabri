const FULL_NAME = 'Ahmed El Gabri'
const HANDLE = 'ahmedelgabri'
const JSR_USER = 'ahmed'
const DOMAIN = 'gabri'

// deno-lint-ignore no-control-regex
const ANSI_PATTERN = /\x1B\[[0-?]*[ -/]*[@-~]/g
const CONTENT_WIDTH = 52
const HORIZONTAL_PADDING = 3
const HORIZONTAL_MARGIN = 10
const VERTICAL_MARGIN = 5

/** Options controlling how the card is rendered. */
export interface CardOptions {
	/** Whether to include ANSI color escape sequences. Defaults to `true`. */
	color?: boolean
}

function styler(
	enabled: boolean,
	open: number,
	close: number,
): (value: string) => string {
	if (!enabled) return (value: string): string => value

	const openCode = `\x1b[${open}m`
	const closeCode = `\x1b[${close}m`
	return (value: string): string =>
		`${openCode}${value.replaceAll(closeCode, openCode)}${closeCode}`
}

function visibleWidth(value: string): number {
	return value.replace(ANSI_PATTERN, '').length
}

/**
 * Returns a boxed personal card containing personal information.
 *
 * @param options Options controlling the rendered output.
 * @returns The rendered card.
 */
export function getCard(options: CardOptions = {}): string {
	const color = options.color ?? true
	const blue = styler(color, 34, 39)
	const yellow = styler(color, 33, 39)
	const reset = styler(color, 0, 0)
	const gray = styler(color, 90, 39)
	const dim = styler(color, 2, 22)

	const handle = blue(HANDLE)
	const work = reset(`Principal Engineer ${yellow('@Mirohq')}`)
	const twitter = blue(`https://twitter.com/${handle}`)
	const github = blue(`https://github.com/${handle}`)
	const linkedin = blue(`https://linkedin.com/in/${handle}`)
	const web = blue(`https://${DOMAIN}.me`)
	const npx = reset(`npx ${handle}@latest`)
	const deno = reset(
		`deno run -r --allow-env jsr:@${blue(JSR_USER)}/card`,
	)

	const lines = [
		`${gray('      Work: ')} ${work}`,
		'',
		`${dim('    GitHub: ')} ${github}`,
		`${dim('  LinkedIn: ')} ${linkedin}`,
		`${dim(' Twitter/X: ')} ${twitter}`,
		`${dim('       Web: ')} ${web}`,
		'',
		`${gray('      Deno: ')} ${deno}`,
		`${gray('      Node: ')} ${npx}`,
	]

	const margin = ' '.repeat(HORIZONTAL_MARGIN)
	const padding = ' '.repeat(HORIZONTAL_PADDING)
	const borderWidth = CONTENT_WIDTH + (HORIZONTAL_PADDING * 2)
	const top = blue(
		`${margin}╭ ${FULL_NAME} ${
			'─'.repeat(borderWidth - FULL_NAME.length - 2)
		}╮`,
	)
	const bottom = blue(`${margin}╰${'─'.repeat(borderWidth)}╯`)
	const content = ['', ...lines, ''].map((line) => {
		const remaining = ' '.repeat(CONTENT_WIDTH - visibleWidth(line))
		return `${margin}${blue('│')}${padding}${line}${remaining}${padding}${
			blue('│')
		}`
	})

	return `${'\n'.repeat(VERTICAL_MARGIN)}${top}\n${
		content.join('\n')
	}\n${bottom}${'\n'.repeat(VERTICAL_MARGIN)}`
}
