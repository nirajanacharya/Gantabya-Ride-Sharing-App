const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');  

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password, vehicle } = req.body;

    // Check if captain is already registered
    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });
    if (isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: 'Captain already registered' });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create the captain
    const captain = await captainService.createCaptain({
       fullname:{
              firstname:fullname.firstname,
              lastname:fullname.lastname
         },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });
    // Generate a token
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
};


module.exports.loginCaptain = async (req, res, next) => {
const errors = validationResult(req);   
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})

}
const {email,password} = req.body;

const captain = await captainModel.findOne({email}).select('+password');
if(!captain){
    return res.status(401).json({message:'Invalid Email or Password'});   
}
const isMatch = await captain.comparePassword(password);
if(!isMatch){
    return res.status(401).json({message:'Invalid Email or Password'});
}
const token = captain.generateAuthToken();
res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });    
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}
