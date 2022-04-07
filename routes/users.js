const express =require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile' , passport.checkAuthentication , usersController.profile);

router.get('/profile',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/log-in',usersController.logIn);

router.post('/create' ,usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/log-in'},
),usersController.createSession);
router.get('/sign-out', usersController.destroySession);
module.exports=router;
