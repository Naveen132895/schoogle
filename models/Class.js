const mongoose = require('mongoose'), Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// var Class = mongoose.model('class',
// {
//     grade: { type : Number },
//     section: {type : String },
//     classTeacher: [{
//       type : Schema.Types.ObjectId,
//         ref: 'User'
//   }]
// });


const ClassSchema = new Schema({
  grade: Number ,
    section: String ,
    class: {
      type: Schema.Types.ObjectId,
      ref: "class"
    }
});

ClassSchema.plugin(passportLocalMongoose);
const Class = mongoose.model('Class', ClassSchema, 'classes');

module.exports = { Class };