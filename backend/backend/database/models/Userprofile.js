let Sequelize = require('sequelize');
let db = require('../database/database');

let Userprofile = db.define('userprofile',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: Sequelize.STRING,
    education: Sequelize.STRING,
    rewards: Sequelize.STRING,
    birthday: Sequelize.DATE,
    gender: Sequelize.STRING
})

module.exports = Userprofile;