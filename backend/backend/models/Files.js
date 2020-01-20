let Sequelize = require('sequelize');
let db = require('../database/database');

let Files = db.define('files',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
            isUrl: true
        }
    }
})

module.exports = Files;