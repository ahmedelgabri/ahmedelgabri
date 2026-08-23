import { readFile } from 'node:fs/promises'
import * as card from '../npm/dist/mod.js'
import { assertCardContract } from './contract.js'

const golden = {
	color: await readFile(
		new URL('./fixtures/card.color.txt', import.meta.url),
		'utf8',
	),
	plain: await readFile(
		new URL('./fixtures/card.plain.txt', import.meta.url),
		'utf8',
	),
}

assertCardContract(card, golden)
