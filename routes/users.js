const express = require('express');
var router = express.Router();
const  bcrypt   = require('bcrypt-nodejs');

var { User } = require('../models/User');

//get all vlaues from DB
router.get('/', (req, res) => {
    User.find((err, doc) => {
        
        if(!err){ 
            res.send(doc);
        }else{
            console.log("Error in Retrive User"+JSON.stringify(err,undefined,2));
        }
    });
});


router.get('/:username', (req, res) => {
    User.findOne({username : req.params.username}, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log("Error in retrive User"+JSON.stringify(err,undefined,2));
        }
    });

})


router.put('/:username', (req, res) => {
    if (!req.params.username){
        return res.status(400).send(`No record with given id : ${req.params.username}`)};

    var usr = {
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        emailID : req.body.emailID,
        phoneNumber : req.body.phoneNumber,
        role : req.body.role
    };
    User.findOneAndUpdate({username : req.params.username}, { $set: usr }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:username', (req, res) => {
    if (!req.params.username)
        return res.status(400).send(`No record with given id : ${req.params.username}`);

        User.findOneAndRemove({username : req.params.username}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;