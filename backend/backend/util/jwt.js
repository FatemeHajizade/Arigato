let jwt = require('jsonwebtoken');
let JWT_SECRET = '2eafew5rew5a2fewfwef2';
let JWT_SECRET_email = '3sajqeieZdceiskla1';

async function createJwtEmail(user){
    let token = jwt.sign(user,JWT_SECRET_email);
    return token;
}

async function createJwt(user) {
    let token = jwt.sign(user,JWT_SECRET);
    return token;
}

async function verifyJwtEmail(token){
    let user = jwt.verify(token, JWT_SECRET_email);
    return user;
}

async function verifyJwt(token){
    let user = jwt.verify(token, JWT_SECRET);
    return user;
}

module.exports = {
    createJwtEmail,
    verifyJwtEmail,
    createJwt,
    verifyJwt
}