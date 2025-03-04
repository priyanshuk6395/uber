const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !lastname || !email || !password){
        throw new Error('All fields required');
    }
    const newUser = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return newUser;
}