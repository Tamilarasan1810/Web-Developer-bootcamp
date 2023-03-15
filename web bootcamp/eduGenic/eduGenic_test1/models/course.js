const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename:{
        type:String,
        required:true
    },
   faculty:{
    type:Schema.Types.ObjectId,
    ref:'Faculty'
   },
   subcourse:[{
    type:Schema.Types.ObjectId,
    ref:'Subcourse'
   }],
})

const Course = mongoose.model('Course',courseSchema);
module.exports=Course;