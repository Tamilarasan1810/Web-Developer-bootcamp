const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true,
    },
    courseid:{
            type:Schema.Types.ObjectId,
            ref:'Course'
        }
    
})

const Faculty = mongoose.model('Faculty',facultySchema);
module.exports=Faculty;