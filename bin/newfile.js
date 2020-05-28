#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .description(pkg.description)
  .arguments('<filepath>')
  .command('then [cmds...]', 'commands to run after created file')
  .action((out, cmds)=>{
    console.log( out, cmds )
  })

program.parse(process.argv)