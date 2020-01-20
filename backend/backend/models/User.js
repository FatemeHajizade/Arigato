let Sequelize = require('sequelize');
let db = require('../database/database');
let Project = require('./Project');
let Skill = require('./Skill');
let Offer = require('./Offer');
let Userprofile = require('./Userprofile');

let User = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail : true
        }, 
        unique: true,
        allowNull: false
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    jobtitle: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isclient: Sequelize.BOOLEAN
},{
    timestamps: true
})

module.exports = User;