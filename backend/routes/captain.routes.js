const express = require('express'); 
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Mail'),
    body('fullname.firstname').isLength({min:1}).withMessage('First name must available'),
    body('password').isLength({min:5}).withMessage('Password must be of 5 characters'),
    body('vehicle.color').isLength({min:1}).withMessage('Color must be available'),
    body('vehicle.plate').isLength({min:1}).withMessage('Plate must be available'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be available'),
    body('vehicle.vehicleType').isIn(["car", "motorcycle", "auto"]).withMessage('Invalid vehicle type'),
],
captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Mail'),
    body('password').isLength({min:5}).withMessage('Password must be of 5 characters'),
],
captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutUser);

module.exports = router;