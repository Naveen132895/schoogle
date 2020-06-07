const mongoose = require('mongoose'), Schema = mongoose.Schema
const  bcrypt   = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const UserDetail = new Schema({
    username : String ,
    password : String ,
    firstname : String ,
    lastname: String ,
    emailID : String ,
    phoneNumber : Number ,
    role : Number 
});

UserDetail.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
 
UserDetail.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

UserDetail.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserDetail, 'users');


module.exports = { User };