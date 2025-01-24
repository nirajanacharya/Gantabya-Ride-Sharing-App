const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        console.log(req.user); 
        const userId = req.user?._id || req.body.user?._id;
        if (!userId) {
            throw new Error('User ID is required');
        }
        const { pickup, destination, vehicleType } = req.body;
        const ride = await rideService.createRide(userId, pickup, destination, vehicleType);
        res.status(201).json(ride);
    } catch (error) {
        res.status(400).json({
            code: 'BAD_REQUEST_ERROR || ride controller',
            message: error.message
        });
    }
}