const pc = require('picocolors')
const boxen = require('boxen')

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
}

// Text + pc definitions
const name = pc.reset('Ahmed El Gabri')
const handle = pc.cyan('ahmedelgabri')
const work = pc.reset('Staff Software Engineer @MiroHQ')
const twitter = pc.cyan(`https://twitter.com/${handle}`)
const github = pc.cyan(`https://github.com/${handle}`)
const linkedin = pc.cyan(`https://linkedin.com/in/${handle}`)
const web = pc.cyan('https://gabri.me')
const npx = pc.reset(`npx ${handle}`)
const labelWork = pc.bold(pc.reset('      Work: '))
const labelTwitter = pc.bold(pc.reset('   Twitter: '))
const labelGitHub = pc.bold(pc.reset('    GitHub: '))
const labelLinkedIn = pc.bold(pc.reset('  LinkedIn: '))
const labelWeb = pc.bold(pc.reset('       Web: '))
const labelCard = pc.bold(pc.reset('      Card: '))

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
  getCard: () => pc.green(boxen(output, options)),
  getPlainCard: () => output,
}
