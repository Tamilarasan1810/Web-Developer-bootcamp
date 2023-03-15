const mongoose=require('mongoose');
const Faculty = require('../models/faculty');
const Course =require('../models/course');
const Subcourse = require('../models/subcourse');

const subcourses = require('./subcourse_seed');

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

const seedSubCourseDB = async() =>{

    for(let i =0;i<5;i++)
    {
        const subcourse = new Subcourse({
           subcoursename:subcourses[i].subcoursename,
           coursename:subcourses[i].coursename,
           subcourseurl:subcourses[i].subcourseurl
        });
        const res =await subcourse.save();
    }
   

}
seedSubCourseDB().then(()=>
{
    mongoose.connection.close();
});  


