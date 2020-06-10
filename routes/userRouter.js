const express = require('express');
var router = express.Router();
const  bcrypt   = require('bcrypt-nodejs');

const { User } = require('../models/User');

// Get allUser detail
router.route('/').get(function(req, res) {
    User.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

//Get Specific User detail
router.get('/:username', (req, res) => {
    User.findOne({username : req.params.username}, (err, doc) => {
        if(!err){ res.send(doc); }
        else{ console.log("Error in retrive User"+JSON.stringify(err,undefined,2)); }
    });
});

//update Specific User detail
router.put('/:username', (req, res) => {
    let user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

    User.findOneAndUpdate({username : req.params.username}, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Delete Specific User detail
router.delete('/:username', (req, res) => {
    User.findOneAndRemove({username : req.params.username}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log(res.send(err)); }
    });
});

// isValid User or not
router.route('/validate').post(function(req, res) {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (!user) res.send("Invalid User");
        else  res.send(user); 
    });
});

module.exports = router;