const fs = require('fs')
const crypto = require('crypto')
const {join, resolve} = require('path')
const pull = require('pull-stream')
const ssbKeys = require('ssb-keys')
const mkdirp = require('mkdirp')
const merge = require('lodash.merge')

module.exports = function(argv, cb) {
  const {dryRun} = argv
  const outputDir = argv.output || process.cwd()

  const path = join(outputDir, '.tre')
  mkdirp.sync(path)

  const keySrc = argv['copy-keys']
  if (keySrc) copyKeys(path, keySrc)
  const keys = ssbKeys.loadOrCreateSync(join(path, 'secret'))
  const browserKeys = ssbKeys.loadOrCreateSync(join(path, 'browser-keys'))
  const netKeys = ssbKeys.loadOrCreateSync(join(path, 'network-keys'))

  const caps = netKeys.public.split('.')[0]
  const network = '*' + netKeys.public
  const port = Math.floor(50000 + 15000 * Math.random())

  const config = {
    network,
    caps: {shs: caps},
    port,
    ws: {port: port + 1},
    blobs: {
      legacy: false,
      sympathy: 10,
      max: 3221225472
    },  
    master: [browserKeys.id],
    budo: {
      host: 'localhost',
      port: port + 2
    }
  }
  writeConfig(outputDir, config)

  // util

  function copyKeys(path, keySrc) {
    if (keySrc == true) {
      keySrc = join(process.env.HOME, '.ssb', 'secret')
    }
    const dest = join(path, 'secret')
    if (dryRun) {
      console.error(`Would copy file from ${keySrc} to ${dest}`)
    } else {
      fs.copyFileSync(keySrc, dest, fs.constants.COPYFILE_EXCL)
    }
  }

  function writeConfig(outputDir, config) {
    const file = '.trerc'
    const path = join(outputDir, file)
    if (fs.existsSync(path)) {
      return console.error(`${path} already exists, won't overwrite.`)
    }
    const json = JSON.stringify(config, null, 2)
    if (dryRun) {
      console.error(`Would write ${path} with content:\n${json}`)
    } else {
      fs.writeFileSync(path, json, 'utf8')
    }
  }
}
