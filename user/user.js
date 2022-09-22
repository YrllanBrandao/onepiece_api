const Connection = require('../database/database');
const Sequelize = require("sequelize");


const User = Connection.define('user', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});


User.sync({force:false});

module.exports = User;