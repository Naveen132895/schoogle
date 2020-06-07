const express = require('express');
var router = express.Router();
const mongoose = require('mongoose'), Schema = mongoose.Schema

var { Class } = require('../models/Class');
//get all vlaues from DB
router.get('/', (req, res) => {
    Class.find((err, doc) => {
        if(!err){ 
            res.send(doc);
        }else{
            console.log("Error in Retrive User"+JSON.stringify(err,undefined,2));
        }
    });
});


router.get('/:username', (req, res) => {
    Class.findOne({username : req.params.username}, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log("Error in retrive User"+JSON.stringify(err,undefined,2));
        }
    });

})

router.post('/',(req,res) => {

    
    var classes = new Class(req.body.class);
    var cls = new Class({
        grade : req.body.grade,
        section : req.body.section,
        class : classes
    });

    cls.save((err,doc) => {
        if(!err){
           res.send(doc);
        }else{
            console.log("Error in insert User data"+JSON.stringify(err,undefined,2));
        }
    });
});

router.put('/:username', (req, res) => {
    if (!req.params.username){
        console.log("Update user")
        return res.status(400).send(`No record with given id : ${req.params.username}`)};

        var cls = new Class({
            grade : req.body.grade,
            section : req.body.section,
            classTeacher: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        });
    Class.findOneAndUpdate({username : req.params.username}, { $set: usr }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.delete('/:username', (req, res) => {
    if (!req.params.username)
        return res.status(400).send(`No record with given id : ${req.params.username}`);

        Class.findOneAndRemove({username : req.params.username}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;