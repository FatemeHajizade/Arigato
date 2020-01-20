let Sequelize = require('sequelize');
let db = require('../database/database');

let Category = db.define('category',{
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
module.exports = Category;