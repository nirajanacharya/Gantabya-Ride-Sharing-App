const { populate } = require('../models/captain.model');
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
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
    const perKmCar = 25;
    const perKmMotorcycle = 5;
    
    console.log(distanceTime);

    const fares = {
        auto: Math.round(baseFareAuto + ((distanceTime.distance)/1000 * perKmAuto)),
        car: Math.round(baseFareCar + ((distanceTime.distance)/1000 * perKmCar)),
        motorcycle: Math.round(baseFareMotorcycle + ((distanceTime.distance)/1000 * perKmMotorcycle))
    };
    console.log(fares);

    return fares;
}

module.exports.getFare = getFare;

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

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide= async({rideId,otp,captain})=>{
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })


    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}