let express = require('express');
let router = express.Router();
let {userAuthViaToken} = require('../middleware/auth');
let {createUser , updateUser , confirmingEmail , changePass , getUserWithId , getUser , freelancers , editeProfile , freelancerWithSpecSkil , loginUser , allUsers} = require('../controllers/user.controller');

router.post('/', createUser);
router.put('/', userAuthViaToken ,updateUser);
router.get('/confirmation/:token', confirmingEmail);
router.post('/login', loginUser);
router.get('/seeAll', allUsers);
router.get('/seeAllLancers', freelancers);
router.post('/seeAllLancersSkill', freelancerWithSpecSkil);
router.put('/editeProfile', userAuthViaToken , editeProfile);
router.put('/changePass', userAuthViaToken , changePass);
router.get('/getUser', userAuthViaToken , getUser);
router.post('/getWithId', getUserWithId);

module.exports = router;