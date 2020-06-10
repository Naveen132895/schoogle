const mongoose = require('mongoose'), Schema = mongoose.Schema

const UserDetail = new Schema({
    username : String ,
    password : String ,
    firstname : String ,
    lastname: String ,
    emailID : String ,
    phoneNumber : Number ,
    role : Number 
});

const User = mongoose.model('User', UserDetail);

module.exports = { User };