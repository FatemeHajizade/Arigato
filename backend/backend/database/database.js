let Sequelize = require('sequelize');

let db = new Sequelize(
    'postgres',
    'postgres',
    '2240227516',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false,
        force: true
    }
);

module.exports = db;
//comment