const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/get-cordinates', query('address').isString(), authMiddleware.authUser, mapController.getCoordinates);
router.get('/get-distance-time', query('origin').isString(), query('destination').isString(), authMiddleware.authUser, mapController.getDistanceTime);
router.get('/get-suggestions', query('query').isString(), authMiddleware.authUser, mapController.getSuggestions);

module.exports = router;