let Sequelize = require('sequelize');
let db = require('../database/database');
let Skill = require('./Skill');
let Category = require('./Category');
let Files = require('./Files');
let Offer = require('./Offer');


let Project = db.define('project',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    projectname: {
        type: Sequelize.STRING,
        unique: true
    },
    budget: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    paystatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    startdate: Sequelize.DATE,
    finishdate: Sequelize.DATE,
    setprice: Sequelize.INTEGER
})

module.exports = Project;