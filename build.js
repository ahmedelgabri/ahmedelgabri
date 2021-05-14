const fs = require('fs')
const path = require('path')
const _ = require('./')

fs.writeFileSync(path.join(__dirname, 'bin/output'), _.getCard(), 'utf-8')
