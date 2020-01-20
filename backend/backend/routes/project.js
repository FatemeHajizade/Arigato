let express = require('express');
let router = express.Router();
let {userAuthViaToken} = require('../middleware/auth');
let {createProject,allProject,lancerProject,acceptOneOffer,getSkills,getCategories,getProjectWithId,seeAllProjectCategory,seeAllProjectSkill,myOffers,clientPaidProject,lancerProjectsToDo,clientProject, sendOffer} = require('../controllers/project.controller');

router.post('/create' , userAuthViaToken , createProject);
router.get('/seeAllProject' , allProject);
router.get('/lancerProject' , userAuthViaToken , lancerProject);
router.get('/clientProject' , userAuthViaToken , clientProject);
router.post('/sendOffer' , userAuthViaToken , sendOffer);
router.post('/acceptingOffer' , userAuthViaToken , acceptOneOffer);
router.get('/lancerProjectsToDo' , userAuthViaToken , lancerProjectsToDo);
router.get('/myOffers' , userAuthViaToken , myOffers);
router.get('/clientPaidProject' , userAuthViaToken , clientPaidProject);
router.post('/seeAllProjectCategory' , seeAllProjectCategory);
router.post('/seeAllProjectSkill' , seeAllProjectSkill);
router.post('/getProjectWithId' , getProjectWithId);
router.get('/getCategories' , getCategories);
router.get('/getSkills' , getSkills);

module.exports = router;