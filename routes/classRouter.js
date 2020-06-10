const express = require('express');
const router = express.Router();
const  bcrypt   = require('bcrypt-nodejs');

const { Class } = require('../models/Class');
const { User } = require('../models/User');


// Register class Router
router.route('/V/').post((req, res) => {
    let clas = new Class(req.body);
    clas.save()
    .then(reg => { res.send(reg); })
    .catch(err => { res.send("Failed to store to database"+err); });
});
 
// Get allClass detail without populate
router.route('/V/').get((req, res) => {
    Class.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

// Get respective class detail without populate ie 12
router.route('/V/:grade/').get((req, res) => {
    Class.find({grade : req.params.grade},(err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

// Get specific class detail without populate ie 12 A
router.route('/V/:grade/:section').get((req, res) => {
    Class.findOne({grade : req.params.grade, section : req.params.section},(err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

//Delete Specific User detail
router.route('/V/:grade').delete((req, res) => {
    Class.findOneAndRemove({grade : req.params.grade}, (err, doc) => {
        if (!err) res.send(doc); 
        else  console.log(res.send(err)); 
    });
});

//Mapping Teacher to specific clas
router.route('/v1/:username/:grade/:section').post((req, res) => {
    var clas, usr;
    console.log(req.params.grade)
    User.findOne({username : req.params.username },(err, data) => { usr = new User(data); });
    Class.findOne({grade : req.params.grade, section : req.params.section },(err, data) => {
        clas = new Class(data); 
        clas.class.push(usr); 
        clas.save().then(reg => { res.send(reg); }).catch(err => { res.status(400).send("Error mapping teacher"); });
    });
});

// Get allclass detail with populated value
router.route('/v1/').get((req, res) => {
    Class.find().populate('class').exec((err,doc) => { res.send(doc); });
});

// Get specific class detail with populated value
router.route('/v1/:grade').get((req, res) => {
    Class.find({grade : req.params.grade}).populate('class').exec((err,doc) => {
       if(!err) res.send(doc);
       else res.send(err);
    });
});


//Pending remove teacher and update teacher
module.exports = router;