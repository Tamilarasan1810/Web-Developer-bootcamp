const mongoose=require('mongoose');
const Faculty = require('../models/faculty');
const Course =require('../models/course');
const Subcourse = require('../models/subcourse');

const faculties = require('./faculty_seed');

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/eduGenic_1",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo db Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo db Connected Successfully");
    }
});


// const sample=(array)=>{
//     return array[Math.floor(Math.random()*array.length)];
// }

const seedFacultyDB = async() =>{


    const faculty=await Faculty.findOne({username:'Tamilarasan'});
   // console.log(faculty._id);
    const course = await Course.findOne({coursename:'Python'}).populate('subcourse');
   // console.log(course);
   faculty.courseid = course;
   //await faculty.save();

//     for(let i =0;i<4;i++)
//     {
//         const faculty = new Faculty({
//             username:faculties[i].username,
//             password:faculties[i].password

//         });
//        const res =await faculty.save();
//    }
    
}



seedFacultyDB().then(()=>
{
    mongoose.connection.close();
});

