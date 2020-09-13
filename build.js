'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const boxen = require('boxen')

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
}

// Text + chalk definitions
const data = {
  name: chalk.white('Ahmed El Gabri /'),
  handle: chalk.cyan('ahmedelgabri'),
  work: chalk.white('Tech Lead, Platform @Mirohq'),
  twitter: chalk.cyan('https://twitter.com/ahmedelgabri'),
  github: chalk.cyan('https://github.com/ahmedelgabri'),
  linkedin: chalk.cyan('https://linkedin.com/in/ahmedelgabri'),
  web: chalk.cyan('https://gabri.me'),
  npx: chalk.white('npx ahmedelgabri'),
  labelWork: chalk.white.bold('      Work: '),
  labelTwitter: chalk.white.bold('   Twitter: '),
  labelGitHub: chalk.white.bold('    GitHub: '),
  labelLinkedIn: chalk.white.bold('  LinkedIn: '),
  labelWeb: chalk.white.bold('       Web: '),
  labelCard: chalk.white.bold('      Card: '),
}

// Actual strings we're going to output
const heading = `${data.name} ${data.handle}`
const working = `${data.labelWork} ${data.work}`
const twittering = `${data.labelTwitter} ${data.twitter}`
const githubing = `${data.labelGitHub} ${data.github}`
const linkedining = `${data.labelLinkedIn} ${data.linkedin}`
const webing = `${data.labelWeb} ${data.web}`
const carding = `${data.labelCard} ${data.npx}`

// Put all our output together into a single variable so we can use boxen effectively
const output = `${heading}

  ${working}
  ${twittering}
  ${githubing}
  ${linkedining}
  ${webing}

  ${carding}`

fs.writeFileSync(
  path.join(__dirname, 'bin/output'),
  chalk.green(boxen(output, options)),
)

fs.writeFileSync(
  path.join(__dirname, 'index.js'),
  `export const card = \`${chalk.green(boxen(output, options))}\``,
)

fs.writeFileSync(
  path.join(__dirname, 'index.cjs.js'),
  `module.exports = \`${chalk.green(boxen(output, options))}\``,
)
