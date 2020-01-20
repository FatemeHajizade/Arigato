let Sequelize = require('sequelize');
let db = require('../database/database');

let Skill = db.define('skill',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    }
})



module.exports = Skill;