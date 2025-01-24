const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');  

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.json(coordinates);
    } catch (error) {
        res.status(404).json({
            code: 'BAD_REQUEST_ERROR',
            message: error.message
        });
    }   
}

module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        // Convert duration from seconds to days, hours, minutes, seconds
        const seconds = distanceTime.duration;
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const formattedDuration = `${days}d ${hours}h ${minutes}m ${secs}s`;

        res.status(200).json({
            distance: distanceTime.distance, // distance in meters
            duration: formattedDuration      // duration in days, hours, minutes, seconds
        });
    } catch (error) {
        res.status(404).json({
            code: 'BAD_REQUEST_ERROR',
            message: error.message
        });
    }
}


module.exports.getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { query } = req.query;
        const suggestions = await mapService.getSuggestions(query);
        res.json(suggestions);
    } catch (error) {
        res.status(404).json({
            code: 'BAD_REQUEST_ERROR',
            message: error.message
        });
    }
}