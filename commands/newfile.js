const fs = require('fs-extra')
const path = require('path')
const colors = require('colors')
const prompts = require('prompts')
const {Signale} = require('signale')
const isZh = process.env.LANG.includes('zh_')

const signale = new Signale({
  // interactive: true,
  types: {
    success: { label: isZh ? '已创建:':'created:', badge: '👏' }
  }
})


const handleFileExist = async (exist)=>{
  // 如果文件不存在则跳过prompts
  if(!exist) return
  console.clear()
  const ans = await prompts([
    {
      type: 'confirm',
      name: 'file',
      message: isZh ? `文件已存在，是否覆盖？`:`File already exist, overwrite or not?`
    }
  ])
  if(!ans.file) process.exit() // 如果 n 则终止程序

  return ans.file
}

const newfile = async (filepath)=>{
  try {
    // 记录时间 start
    const timeStart = new Date().getMilliseconds()

    // 检查文件
    const isFile = filepath.match(/[^\/]+(?!.*\/)/) // 最后结尾不是反斜杠/则为文件
    const fileExist = isFile && await fs.pathExists(filepath)
    
    // confirm重复文件
    await handleFileExist(fileExist)
    
    // 创建文件
    await fs.ensureDir(filepath.replace(/[^\/]+(?!.*\/)/, '')) // 目录
    if(isFile) await fs.writeFile(filepath, '') // 文件

    // 记录时间 end
    const timeEnd = new Date().getMilliseconds()
    const time = Math.abs(timeEnd - timeStart) / 1000 + 's'

    signale.success(filepath.green.inverse + `    ${isZh?'仅':'in'} ${time}\n`.gray)

    return
  } catch (err) {
    signale.error(err.message)
    process.exit()
  }
}

module.exports = newfile