let Sequelize = require('sequelize');
let db = require('../database/database');

let Offer = db.define('offer',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: Sequelize.TEXT,
    timeneeded: Sequelize.STRING,
    price: Sequelize.INTEGER,
    status: {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
})

module.exports = Offer;