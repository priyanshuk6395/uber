const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {body} = require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Mail'),
    body('fullname.firstname').isLength({min:1}).withMessage('First name must available'),
    body('password').isLength({min:5}).withMessage('Password must be of 5 characters')
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Mail'),
    body('password').isLength({min:5}).withMessage('Password must be of 5 characters')
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser);

module.exports = router;
