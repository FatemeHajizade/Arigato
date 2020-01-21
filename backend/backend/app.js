let express = require('express');
let bodyParser = require('body-parser');
let projectRoutes = require('./routes/project');
let userRoutes = require('./routes/user');
let adminRouter = require('./routes/admin');
let cors = require('cors');

let User = require('./models/User');
let Skill = require('./models/Skill');
let Category = require('./models/Category');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/admin',adminRouter);

module.exports = app;