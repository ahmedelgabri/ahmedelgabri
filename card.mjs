#!/usr/bin/env node

'use strict'

import * as _ from './index.mjs'

console.log(_.getCard({no_color: process.env.NO_COLOR}))
