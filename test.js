const fs = require('fs')

fs.mkdir(__dirname+'/test/ok/', {recursive: true}, err=>{
  console.log( err )
})