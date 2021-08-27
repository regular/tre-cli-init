#!/usr/bin/env node
const {parse, join, resolve, dirname} = require('path')
const ssbKeys = require('ssb-keys')
const debug = require('debug')('tre-cli-init:bin')
const run = require('.')

const argv = require('minimist')(process.argv.slice(2))
debug('parsed command line arguments: %O', argv)

if (argv.help) {
  const bin = argv['run-by-tre-cli'] ? 'tre init' : 'tre-cli-init'
  if (argv.help) {
    console.error(require('./help')(bin))
    process.exit(0)
  }
}

function bail(err) {
  if (err) {
    console.error(err.message)
    process.exit(1)
  }
}

run(argv, err => {
  bail(err)
})
