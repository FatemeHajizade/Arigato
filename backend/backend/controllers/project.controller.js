let Sequelize = require('sequelize');
let Project = require('../models/Project');
let User = require('../models/User');
let Offer = require('../models/Offer');
let Skill = require('../models/Skill');
let Category = require('../models/Category');

async function createProject(req, res) {
    try{
    let id = req.user.id;
    Project.create({
        projectname: req.body.projectname,
        budget : req.body.budget,
        description : req.body.description,
        clientId : id
    })
    .then(project =>{
        if((project)){
            for(let skilll of req.body.skills){
                Skill.findOne({where:{name:skilll.name}})
                .then(skil => {
                    return project.addSkill(skil)
                })
                .catch(err => console.log(err));
            }
        }return project;
    })
    .then(project =>{
        if((project)){
            for(let categ of req.body.categories){
                Category.findOne({where:{name:categ.name}})
                .then(catego => {
                    return project.addCategories(catego)
                })
                .catch(err => console.log(err));
            }
        }return res.send(project);
    })
} catch(e){
    console.log(e);
    res.status(500).json({
        message: 'Something goes wrong',
        data: {}
    });
    }
}


async function allProject(req,res) {
    try{
        Project.findAll({
            include:[{
                model:Skill,
                as:'Skills'
            },{model:Category,
                as: 'Categories'}
            ]
        })
            .then(pro => res.send(pro))
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
        }
}

async function getProjectWithId(req,res){
    
    Project.findOne({
        include:[{
            model:Skill,
            as:'Skills'
        },{model:Category,
            as: 'Categories'}],
        where: { id: req.body.id}
    })
    .then(project => res.send(project))
}

async function getCategories(req,res) {
    Category.findAll()
        .then(cat => 
            console.log("request for categories" + cat.length)||
            res.send(cat))

}

async function getSkills(req,res) {
    Skill.findAll()
        .then(skill => res.send(skill))
}
