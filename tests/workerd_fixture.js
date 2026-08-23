import * as card from 'card'
import color from 'card.color.txt'
import { assertCardContract } from 'contract'
import plain from 'card.plain.txt'

export default {
	test() {
		assertCardContract(card, { color, plain })
	},
}
