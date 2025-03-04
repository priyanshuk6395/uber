const express = require('express');
const router = express.Router();
const mapsService = require('../services/maps.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinates=async (req, res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()===false){
        return res.status(400).json({error:errors.array()});
    }

    const {address} = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }
    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ error: 'Failed to fetch coordinates' });
    }
};

module.exports.getDistanceTime=async (req, res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()===false){
        return res.status(400).json({error:errors.array()});
    }

    const {origin, destination} = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }
    try {
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ error: 'Failed to fetch distance and time' });
    }
}

module.exports.getSuggestions=async (req, res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()===false){
        return res.status(400).json({error:errors.array()});
    }

    const {input} = req.query;
    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }
    try {
        const suggestions = await mapsService.getSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(404).json({ error: 'Failed to fetch suggestions' });
    }
}
