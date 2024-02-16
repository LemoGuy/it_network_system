const bcrypt = require('bcryptjs')


let hash = bcrypt.hashSync('12345678', bcrypt.genSaltSync(10))

console.log(hash)