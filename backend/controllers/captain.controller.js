const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;
        const { firstname, lastname } = fullname;

        const isCaptainExist = await captainModel.findOne({ email });
        if(isCaptainExist){
            return res.status(400).json({message:'Captain already exist'});
        }

        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstname, lastname, email, password: hashedPassword, ...vehicle
        })

        const token = captain.generateAuthToken();

        res.cookie('token', token).status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainService.loginCaptain(email, password);
        if(!captain){
            return res.status(400).json({message:'Invalid email or password'});
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token).status(200).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.captain);
        
    } catch (error) {
        next(error);
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blacklistTokenModel.create({ token }); 
        res.clearCookie('token').status(200).json({message:'Logout successfully'});
    } catch (error) {
        next(error);
    }
}