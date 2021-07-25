const express = require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user_controller');
const postController = require('../controller/postController');

router.get('/profile' , passport.checkAuthentication , userController.profile);
router.get('/posts' ,postController.posts );

router.get('/sign-up' ,userController.signup );
router.get('/sign-in' , userController.signin);

router.post('/create' , userController.create);

// Use passport as middleware to authenticate
router.post('/create-session' , passport.authenticate(
  'local',
  {failureRedirect : 'user/sign-in'}
) , userController.createSession);

router.get('/sign-out' , userController.destroySession);

// router.get('/Sign-Out' ,userController.deactivate);

module.exports = router;
