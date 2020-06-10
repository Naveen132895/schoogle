const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

var { User } = require('../models/User');

// Login Router
router.route('/').post(function(req, res) {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (!user) res.sendStatus(204);
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(passwordMatch => passwordMatch ? res.send("Login Success") : res.send("Login Fail"))
        }
    });
});
 
module.exports = router;