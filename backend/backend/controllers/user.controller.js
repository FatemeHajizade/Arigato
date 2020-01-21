let Sequelize = require('sequelize');
let User = require('../models/User');
let Skill = require('../models/Skill');
let Category = require('../models/Category');
let Userprofile = require('../models/Userprofile');
let bcrypt = require('bcryptjs');
let {createJwtEmail,createJwt,verifyJwtEmail} = require('../util/jwt');
let nodemailer = require('nodemailer');
let sendgridTransport = require('nodemailer-sendgrid-transport');

let transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:'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'
    }
}));

async function createUser(req, res) {
    let {email,username,isclient,password} = req.body;
    if(!username) {
        res.send('enter username :');
    }
    if(!email) {
        res.send('enter email :');
    }
    if(!password) {
        res.send('enter password :');
    }
    let hashedpass = await bcrypt.hash(password, 12);
    try{
        let newUser =  await User.create({
          email,
          username,
          isclient,
          password : hashedpass
        },{
         fields : ['email','username','isclient','password']
     });
    if(newUser){
        if(newUser.isclient === true){
            Userprofile.create({
                address: req.body.address,
                education: req.body.education,
                rewards: req.body.rewards,
                birthday: req.body.birthday,
                gender: req.body.gender,
                clientId : newUser.id
            })
        }
        else if(newUser.isclient === false){
            Userprofile.create({
                address: req.body.address,
                education: req.body.education,
                rewards: req.body.rewards,
                birthday: req.body.birthday,
                gender: req.body.gender,
                freelancerId : newUser.id
            })
        }
        let createdUser = await User.findOne({
            attributes: ['email','username','id','image'],
            where: {
            username: newUser.username
            }
            });
        // const emailtoken = await createJwtEmail(createdUser.get());
        // const url = `http://localhost:3500/api/user/confirmation/${emailtoken}`;
        // await transporter.sendMail({
        //     to: createdUser.email,
        //     from: 'freelancerIran@node.com',
        //     subject: 'FreelancerIran Signup succeeded!',
        //     html: `
        //     <h1>Please verify your account!</h1>
        //     <button><a href="${url}">click to confirm</button>
        //     `
        // });

        res.json({...createdUser.get()})
        }
} catch(e){
    console.log(e);
    res.status(500).json({
        message: 'Something goes wrong',
        data: {}
    });
}
}