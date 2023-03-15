const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcourseSchema = new Schema({
    subcoursename:{
        type:String,
        required:true
    },
    coursename:{
        type:String,
        required:true
    },
    // course:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Course'
    // },
    subcourseurl:{
        type:String,
        required:true
    },
    
})

const Subcourse = mongoose.model('Subcourse',subcourseSchema);
module.exports=Subcourse;