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

User.hasMany(Project, {as: 'clientProjects' ,foreignKey: 'clientId'})
User.hasMany(Project, {as: 'freelancerProjects' ,foreignKey: 'freelancerId'})
User.hasMany(Offer, {as: 'Offers'});
User.belongsToMany(Skill, { as: 'Skills', through: 'worker_skills', foreignKey: 'userId' })
Skill.belongsToMany(User, { as: 'Workers', through: 'worker_skills', foreignKey: 'skillId' })
User.hasOne(Userprofile,{as: 'freelancer_profile',foreignKey: 'freelancerId'})
Userprofile.belongsTo(User,{foreignKey: 'freelancerId'});
Userprofile.belongsTo(User,{foreignKey: 'clientId'});

module.exports = User;