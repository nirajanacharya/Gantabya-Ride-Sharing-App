

const mongoose = require('mongoose');   
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
fullname:{
    firstname:{
        type:String,
        required:true,
        min:[3, 'fistname must be at least 3 characters'],
    },
    lastname:{
        type:String,
        min:[3, 'lastname must be at least 3 characters'],
    }
},
email:{
    type:String,
    required:true,
    unique:true,
    min:[6, 'email must be at least 6 characters'],
    max:[255, 'email must be at most 255 characters'],
},
password:{
    type:String,
    required:true,
    select:false,
},
socketId:{
    type:String,
},   
})

userSchema.methods.generateAuthToken = function(){
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel=mongoose.model('User', userSchema);

module.exports = userModel; 