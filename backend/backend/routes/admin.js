let express = require('express');
let router = express.Router();
let Skill = require('../models/Skill');
let Category = require('../models/Category');

router.post('/addSkill', (req,res)=>{
    Skill.create({
        name : req.body.name
    }).then(()=>res.send('add Skill successfull'))
});
router.post('/addCategory', (req,res)=>{
    Category.create({
        name : req.body.name
    }).then(()=>res.send('add Category successfull'))
});

module.exports = router;