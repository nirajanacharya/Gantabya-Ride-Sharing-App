
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
    
    
    const { firstname, lastname } = fullname;
    const { color, plate, capacity, vehicleType } = vehicle;

    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        const missingFields = [];
        if (!firstname) missingFields.push('firstname');
        if (!lastname) missingFields.push('lastname');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!color) missingFields.push('color');
        if (!plate) missingFields.push('plate');
        if (!capacity) missingFields.push('capacity');
        if (!vehicleType) missingFields.push('vehicleType');

        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const captain = await captainModel.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType }
    });
    return captain;
};






