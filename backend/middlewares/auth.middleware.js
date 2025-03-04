const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({message:'Unauthorized'});
    }
    const blacklistToken = await blacklistTokenModel.findOne({token});
    if(blacklistToken){
        return res.status(403).json({message:'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired', error: error.message });
    }
    
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({message:'Unauthorized'});
    }
    const blacklistToken = await blacklistTokenModel.findOne({token});
    if(blacklistToken){
        return res.status(403).json({message:'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message:'cookie expired'});
        }
        const captain= await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.captain = captain;
        return next();
    }catch(error){
        console.log(error);
        
        return res.status(401).json({message:'Unauthorized'});
    }
}