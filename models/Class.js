const mongoose = require('mongoose'), Schema = mongoose.Schema;
var { User } = require('./User')

const ClassSchema = new Schema({
  grade: Number ,
  section: String ,
  class: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Class };