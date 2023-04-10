import pc from 'picocolors'
import boxen from 'boxen'

const fullname = 'Ahmed El Gabri'
const social = fullname.toLowerCase().replaceAll(' ', '')
const mastodonHandle = fullname.toLowerCase().split(' ').at(-1)

// Define options for Boxen
const options = {
	title: fullname,
	titleAlignment: 'center',
	padding: 1,
	margin: 1,
	borderStyle: 'bold',
}

// Text + pc definitions
const handle = pc.blue(social)
const work = pc.reset('Staff Software Engineer @MiroHQ')
const twitter = pc.blue(`https://twitter.com/${handle}`)
const github = pc.blue(`https://github.com/${handle}`)
const linkedin = pc.blue(`https://linkedin.com/in/${handle}`)
const mastodon = pc.blue(`https://mastodon.online/@${mastodonHandle}`)
const web = pc.blue('https://gabri.me')
const npx = pc.reset(`npx ${handle}`)
const labelWork = pc.gray('      Work: ')
const labelTwitter = pc.dim(' Twitter: ')
const labelGitHub = pc.dim('  GitHub: ')
const labelLinkedIn = pc.dim('LinkedIn: ')
const labelWeb = pc.dim('     Web: ')
const labelCard = pc.gray('    Card: ')
const labelMastodon = pc.dim('Mastodon: ')

// Actual strings we're going to output
const working = `${labelWork} ${work}`
const twittering = `${labelTwitter} ${twitter}`
const githubing = `${labelGitHub} ${github}`
const linkedining = `${labelLinkedIn} ${linkedin}`
const webing = `${labelWeb} ${web}`
const carding = `${labelCard} ${npx}`
const mastodoning = `${labelMastodon} ${mastodon}`

// Put all our output together into a single variable so we can use boxen effectively
const output = `${working}

  ${githubing}
  ${linkedining}
  ${twittering}
  ${mastodoning}
  ${webing}

  ${carding}`

export function getCard({no_color = false} = {}) {
	if (no_color) {
		process.env.NO_COLOR = 1
	}
	return boxen(output, {
		...options,
		borderColor: process.env.NO_COLOR ? undefined : 'blue',
	})
}

export function getPlainCard({no_color = true} = {}) {
	if (no_color) {
		process.env.NO_COLOR = 1
	}
	return output
}
