#!/usr/bin/env node
const program = require('commander')
const colors = require('colors')
const signale = require('signale')
const execa = require('execa')
const childProcess = require('child_process')
const { version, description } = require('../package.json')

program
  .version(version)
  .description(description)
  .usage('[filepath] then [commands...]')

program.parse(process.argv)