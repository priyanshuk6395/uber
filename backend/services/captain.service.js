const captainModel = require('../models/captain.model');



module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = new captainModel({
        fullname: {firstname, lastname},
        email,
        password,
        vehicle: {color, plate, capacity, vehicleType}
    });
    captain.save();
    return captain;
}

module.exports.loginCaptain = async (email, password) => {
    const captain = await captainModel.findOne({ email }).select('+password');
    if(!captain) {
        return null;
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return null;
    }
    return captain;
}
