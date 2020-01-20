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


async function lancerProject(req,res) {
    try{
        let userskills = await Skill.findAll({
        include:[{
            model:User,
            as:'Workers',
            where:{
                id:req.user.id
            },
            attributes:[],
            }],
        })
    const Op = Sequelize.Op;
    let a=[];
    userskills.forEach(skill=>{
        a.push(skill.id)
    });
    let projects = await Project.findAll({
        where:{paystatus:false},
        include:[{
            model:Skill,
            as:'Skills',
            where:{
                id : { [Op.or]:a }
            },
            attributes:[],  
        }]
    })
    res.json(projects);
    } 
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

async function sendOffer(req,res) {
    try{
        Offer.create({
            comment : req.body.comment,
            timeneeded : req.body.timeneeded,
            price : req.body.price,
            userId : req.user.id,
            projectId : req.body.projectId
        }).then(() => {
            res.send('your project sent successfully')
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
} 

async function clientProject(req,res) {
    try{
        let clientprojects = await Project.findAll({
            include:[{
                model:Offer,
                as:'Offers' 
            }],where: {clientId:req.user.id}
        })
    res.json(clientprojects);
    } 
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

async function seeAllProjectSkill(req,res) {
    try{
    const Op = Sequelize.Op;
    let a=[];
    req.body.s.forEach(skill=>{
        a.push(skill.name)
    });
    let projects = await Project.findAll({
        include:[{
            model:Skill,
            as:'Skills',
            where:{
                name : { [Op.or]:a }
            },
            attributes:[],  
        }]
    })
    res.json(projects);
    } 
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

async function seeAllProjectCategory(req,res) {
    try{
    const Op = Sequelize.Op;
    let a=[];
    req.body.c.forEach(category=>{
        a.push(category.name)
    });
    let projects = await Project.findAll({
        include:[{
            model:Category,
            as:'Categories',
            where:{
                name : { [Op.or]:a }
            },
            attributes:[],  
        }]
    })
    res.json(projects);
    } 
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}



