let {verifyJwt} = require('../util/jwt'); 
async function userAuthViaToken(req,res,next){
    let auth = req.header('Authorization');

    if(!auth){
        return res.status(403).send({
            errors: {
                body: [
                    'Only for logged in users'
                ]
            }
        })
    }

    if(!auth.startsWith('Token')){
        return res.status(400).send({
            errors: {
                body: [
                    'Authorization format not supported'
                ]
            }
        })
    }

    let token = auth.substr(6);
    try{
        let user = await verifyJwt(token);
        req.user = user;
        return next();
    } catch(err) {
        res.status(403).send({
            errors: {
                body: [
                    'JWT verification failed'
                ]
            }
        })
    } 
}

module.exports = {
    userAuthViaToken
}   