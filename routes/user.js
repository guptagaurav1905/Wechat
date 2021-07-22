const express = require('express');

const router = express.Router();

const userController = require('../controller/user_controller');
const postController = require('../controller/postController');

router.get('/profile' , userController.profile);
router.get('/posts' ,postController.posts );

router.get('/sign-up' ,userController.signup );
router.get('/sign-in' , userController.signin);

router.post('/create' , userController.create);
router.post('/create-session' , userController.createSession);

router.get('/Sign-Out' ,userController.deactivate);

module.exports = router;
