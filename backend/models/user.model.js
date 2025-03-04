const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [1, "First name must available"],
    },
    lastname: {
      type: String,
      minlength: [3, "last name must at least 3 character long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must at least 3 character long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [5, "Password must at least 5 character long"],
  },
  socketId: {
    type: String
  }
});

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;