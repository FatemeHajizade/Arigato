let app = require('./app');
let db = require('./database/database');
let User = require('./models/User');
let Skill = require('./models/Skill');
let Category = require('./models/Category');
let project = require('./models/Project');


async function main(){
    try{
    app.listen(3500);
    console.log('Server on port 3500');}
    catch(err){
        console.log(err);
    }
};
main();

db.sync()
    .then( () => {
        app.listen(2854, () => {
            console.log('Server started on http://localhost:27017/')
        })
        
    })
    .catch(err => {
        console.log(err);
    })
