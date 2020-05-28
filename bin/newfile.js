#!/usr/bin/env node
// const program = require('commander')
// const pkg = require('../package.json')

// program
//   .version(pkg.version)
//   .description(pkg.description)
//   .arguments('<filepath>')
//   .command('then [cmd]', 'commands to run after created file')
//   .action((out, cmd)=>{
//     console.log( out, cmd )
//   })

// program.parse(process.argv)


const argv = require('yargs')
  .usage(`
🌞🌈 Do something after created file~

Usage: 
  $ newfile <filepath> then [cmds...]`)
  .example('newfile src/index.js then cd')
  .example('newfile src/index.js then yarn start')
  .command('<filepath> then [cmd]', '', yargs=>{
    console.log( yargs )
  }, argv=>{
    console.log( argv )
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .boolean(['then'])
  .argv

console.log( argv )