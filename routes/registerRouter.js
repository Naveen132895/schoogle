const express = require('express');
var router = express.Router();
const  bcrypt   = require('bcrypt-nodejs');
var { User } = require('../models/User');
 
//get all vlaues from DB
router.post('/register',(req,res) => {
    var usr = new User({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        emailID : req.body.emailID,
        phoneNumber : req.body.phoneNumber,
        role : req.body.role
    });

    usr.save((err,doc) => {
        if(!err){
           res.send(doc);
        }else{
            console.log("Error in insert User data"+JSON.stringify(err,undefined,2));
        }
    });
});
 
module.exports = router;