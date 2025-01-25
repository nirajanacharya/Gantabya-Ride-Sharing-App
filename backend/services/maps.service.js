const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.length > 0) {
            const location = data[0];
            return {
                ltd: location.lat,
                lng: location.lon
            };
        } else {
            throw new Error('Unable to find location');
        }
    } catch (error) {
        throw new Error('Unable to find location');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // Get coordinates for origin
        const originCoords = await module.exports.getAddressCoordinates(origin);
        
        // Get coordinates for destination
        const destCoords = await module.exports.getAddressCoordinates(destination);

        // Use OSRM API to get distance and time
        const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;
        
        const response = await axios.get(url);
        
        if (response.data.code === 'Ok' && response.data.routes.length > 0) {
            return {
                distance: response.data.routes[0].distance, // distance in meters
                duration: response.data.routes[0].duration  // duration in seconds
            };
        } else {
            throw new Error('Unable to calculate route');
        }
    } catch (error) {
        throw new Error('Unable to calculate distance and time');
    }
};

//in nominatim
module.exports.getSuggestions = async (query) => {
if(!query){
    throw new Error('Query is required');
}
try
{
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
    const response = await axios.get(url);
    
    if (response.data && response.data.length > 0) {
        return response.data.map(location => ({
            name: location.display_name,
            lat: location.lat,
            lon: location.lon
        }));
    }
    return [];
} catch (error) {
    throw new Error('Unable to fetch location suggestions');
}
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {

    // radius in km

const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}