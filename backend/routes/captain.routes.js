const express = require('express'); 
const router = express.Router();    
const {body} = require('express-validator');    
const userModel = require('../models/captain.model');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../Middlewares/auth.middleware');   

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name should be atleast 3 characters'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters'),     
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 characters'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity should  at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle', 'auto']).withMessage('Invalid Vehicle Type'),

],captainController.registerCaptain);  

router.post('/login',[ 
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters')
],captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);


router.get('/logout', authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;