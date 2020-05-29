const execa = require('execa')
const signale = require('signale')
const colors = require('colors')
const childProcess = require('child_process')
const isZh = process.env.LANG.includes('zh_')
const path = require('path')
const clipboardy = require('clipboardy')

const execaPromise = (...args)=>{
  return new Promise((res,rej)=>{
    const out = execa(...args).stdout
    out.on('data', data=>{
      process.stdout.write(colors.green(data.toString()))
    })
    out.on('end', ()=>res())
    out.on('error', (err)=>rej(err))
  })
}

// const cd = async filepath =>{
//   // console.log( filepath )
//   await execaPromise('cd', [path.dirname(filepath)])
// }

const then = async ()=>{
  const thenIndex = process.argv.indexOf('then')
  const [filepath, method,...cmds] = process.argv.slice(thenIndex-1)

  if(cmds.length<=1 && cmds[0]!=='cd') return signale.info(colors.gray(isZh?'看起来你好像忘了在then后面写点什么':'It seems like you forgot to do something after then.'))

  if(method === 'then'){

    if(cmds.includes('cd')) {
      clipboardy.writeSync(`cd ${path.dirname(filepath)}`)
      signale.warn(
`
"cd [command]" has no promission to use 😭
But you can paste the command "cd ${path.dirname(filepath)}" in shell, it's already copied! 👏
`.gray  
      )
      signale.success(`Copied "cd ${path.dirname(filepath)}"`)
    }

    const execCmds = cmds.reduce((total,val,index)=>{
      if(val==='then')return total.concat([[]])
      if(index===0)return total.concat([[val]])
      total[total.length-1].push(val)
      return total
    },[])

    for(execCmd of execCmds){
      execCmd[0]!=='cd' && process.stdout.write(`\n\n✨ -------------------------- PROCESS: $ ${execCmd.join(' ')} -------------------------- ✨\n`.magenta)
      try {
        await execaPromise(execCmd[0], execCmd.slice(1))
      } catch (err) {
        signale.error(err.message)
      }
    }
    

  }
}

module.exports = then