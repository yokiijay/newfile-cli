#!/usr/bin/env node
const yargs = require('yargs')
const newfile = require('../commands/newfile')

const argv = yargs
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


if(argv._.includes('then')){
  console.log( 'then commands', argv._ )
}else if(argv._.length === 1){
  newfile(argv._[0])
}else if(!argv._.length){
  yargs
    .showHelp()
}