#!/usr/bin/env node
const yargs = require('yargs')
const newfile = require('../commands/newfile')
const then = require('../commands/then')

const isZh = process.env.LANG.includes('zh_')

const usage = isZh ?
`
🌞🌈 创建文件或目录，同时执行一些命令 ~

Usage: 
  $ newfile <文件或目录路径> then [其他命令...]`
  :
`
🌞🌈 Create a file or folder recursively then do something at once ~

Usage: 
  $ newfile <filepath> then [cmds...]`

const argv = yargs
  .usage(usage)
  .example('newfile src/index.js then cd')
  .example('newfile src/index.js then yarn start')
  .command('<filepath> then [cmd]', '', yargs=>{
    console.log( yargs )
  }, argv=>{
    console.log( argv )
  })
  // .alias('h', 'help')
  // .alias('v', 'version')
  // .boolean(['then'])
  .argv

async function main(){
  // newfile输出help
  if(!argv._.length){
    yargs
      .showHelp()
  }
  // newfile ...
  if(argv._.length >= 1){
    await newfile(argv._[0])
  }

  // newfile ... then ...
  if(argv._.includes('then')) then()
}

main()