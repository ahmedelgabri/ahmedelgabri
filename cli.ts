import { getCard } from './mod.ts'

export { getCard }
export type { CardOptions } from './mod.ts'

type RuntimeGlobals = typeof globalThis & {
	Deno?: {
		noColor?: boolean
		env?: {
			get(name: string): string | undefined
		}
	}
	process?: {
		env?: Record<string, string | undefined>
	}
}

/** Returns whether CLI output should contain ANSI colors. */
export function isColorEnabled(): boolean {
	const globals = globalThis as RuntimeGlobals

	if (globals.Deno?.noColor === true) return false

	try {
		if (globals.Deno?.env?.get('NO_COLOR') !== undefined) return false
	} catch {
		// Deno throws when environment access was not granted.
	}

	try {
		if (
			globals.process?.env &&
			Object.hasOwn(globals.process.env, 'NO_COLOR')
		) return false
	} catch {
		// Treat an inaccessible environment as if NO_COLOR was not set.
	}

	return true
}

/** Prints the card using the current runtime's color preference. */
export function run(output: (card: string) => void = console.log): void {
	output(getCard({ color: isColorEnabled() }))
}

if ((import.meta as ImportMeta & { readonly main?: boolean }).main) {
	run()
}
