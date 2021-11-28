const chalk = require('chalk')
const boxen = require('boxen')

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
}

// Text + chalk definitions
const name = chalk.reset('Ahmed El Gabri')
const handle = chalk.cyan('ahmedelgabri')
const work = chalk.reset('Staff Software Engineer @MiroHQ')
const twitter = chalk.cyan(`https://twitter.com/${handle}`)
const github = chalk.cyan(`https://github.com/${handle}`)
const linkedin = chalk.cyan(`https://linkedin.com/in/${handle}`)
const web = chalk.cyan('https://gabri.me')
const npx = chalk.reset(`npx ${handle}`)
const labelWork = chalk.reset.bold('      Work: ')
const labelTwitter = chalk.reset.bold('   Twitter: ')
const labelGitHub = chalk.reset.bold('    GitHub: ')
const labelLinkedIn = chalk.reset.bold('  LinkedIn: ')
const labelWeb = chalk.reset.bold('       Web: ')
const labelCard = chalk.reset.bold('      Card: ')

// Actual strings we're going to output
const heading = `${name} / ${handle}`
const working = `${labelWork} ${work}`
const twittering = `${labelTwitter} ${twitter}`
const githubing = `${labelGitHub} ${github}`
const linkedining = `${labelLinkedIn} ${linkedin}`
const webing = `${labelWeb} ${web}`
const carding = `${labelCard} ${npx}`

// Put all our output together into a single variable so we can use boxen effectively
const output = `${heading}

  ${working}
  ${twittering}
  ${githubing}
  ${linkedining}
  ${webing}

  ${carding}`

module.exports = {
  getCard: () => chalk.green(boxen(output, options)),
  getPlainCard: () => boxen(output, options),
}
