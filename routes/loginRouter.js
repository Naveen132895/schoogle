const express = require('express');
var router = express.Router();
const  bcrypt   = require('bcrypt-nodejs');
var { User } = require('../models/User');
 
//get all vlaues from DB
router.get('/', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
    User.findOne({username : username}, (err, doc) => {
        if(!err){
            if( bcrypt.compareSync(password,doc.password)){
                res.send("LoginSuccess")
            }else{
                res.send("Login Failure")
            }
        }else{
            console.log("Error in retrive User"+JSON.stringify(err,undefined,2));
        }
    });

})
 
module.exports = router;