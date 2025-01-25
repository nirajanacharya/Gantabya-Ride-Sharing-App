const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service'); 

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
        
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        console.log( pickupCoordinates);

        const captainInRadius=await mapService.getCaptainInTheRadius(pickup, 5);


        res.status(201).json(ride);
    } catch (error) {
        res.status(400).json({
            code: 'BAD_REQUEST_ERROR || ride controller',
            message: error.message
        });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        console.log('Received request for getFare with pickup:', pickup, 'and destination:', destination);
        const fares = await rideService.getFare(pickup, destination);
        console.log('Fares calculated:', fares);
        res.status(200).json(fares);
    } catch (error) {
        console.error('Error in getFare:', error.message);
        res.status(400).json({
            code: 'BAD_REQUEST_ERROR || ride controller',
            message: error.message
        });
    }
}