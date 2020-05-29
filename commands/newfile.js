const fs = require('fs-extra')
const colors = require('colors')
const {Signale} = require('signale')
const signale = new Signale({
  // interactive: true,
  types: {
    success: { label: 'created:', badge: '👏' }
  }
})

const newfile = async (filepath)=>{
  try {
    await fs.ensureFile(filepath)

    signale.success(filepath.green.inverse)

    return
  } catch (err) {
    signale.error(err.message)
  }
}

module.exports = newfile