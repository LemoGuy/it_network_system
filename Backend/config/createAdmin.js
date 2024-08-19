const User = require('../models/User.js')
const bcrypt = require('bcryptjs')

module.exports = async () => {

    let oldAdmin = await User.findOne({ username: 'admin' });
    if (oldAdmin) return;

    let data = {
        name: 'Admin',
        username: 'admin',
        email: 'admin@tiu.edu.iq',
        password: 'admin123',
        type: 'Admin',
        status: 'Active'
    };

    let hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    data['password'] = hash

    await User.create(data);
}
