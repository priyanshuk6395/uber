const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const { firstname, lastname } = fullname;

        const isUserExist = await userModel.findOne({ email });
        if(isUserExist){
            return res.status(400).json({message:'User already exist'});
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname, lastname, email, password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await user.generateAuthToken();
        
        res.status(200).cookie('token', token).json({ token, user });
    } catch (error) {
        next(error);
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await blacklistTokenModel.create({ token });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}