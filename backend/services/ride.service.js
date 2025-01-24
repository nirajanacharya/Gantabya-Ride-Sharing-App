const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFareAuto = 25;
    const baseFareCar = 40;
    const baseFareMotorcycle = 15;

    const perKmAuto = 12;
    const perKmCar = 18;
    const perKmMotorcycle = 8;
    
    console.log(distanceTime);

    const fares = {
        auto: baseFareAuto + ((distanceTime.distance)/1000 * perKmAuto),
        car: baseFareCar + ((distanceTime.distance)/1000 * perKmCar),
        motorcycle: baseFareMotorcycle + ((distanceTime.distance)/1000 * perKmMotorcycle)
    };
    console.log(fares);

    return fares;
}


function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp; 
    }
    return generateOtp(num);
     
}


module.exports.createRide = async (userId, pickup, destination, vehicleType) => {
    if( !userId|| !pickup || !destination || !vehicleType){
        throw new Error('User ID, pickup, destination and vehicle type are required');
    }

    const fares = await getFare(pickup, destination);

    const ride = rideModel.create({
        user: userId,
        pickup: pickup,
        destination: destination,
        otp:getOtp(6),
        fare: fares[vehicleType],
    });

    return ride;
}
