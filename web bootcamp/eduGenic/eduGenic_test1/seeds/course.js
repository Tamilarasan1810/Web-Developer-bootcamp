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

const CourseDB = async() =>{

    
        const faculty=await Faculty.findOne({username:'Tamilarasan'});
        console.log(faculty.username,faculty.password );
        const course = new Course({
          coursename:'Python',
          faculty:faculty,
          
        });
        const subcourses=await Subcourse.find({coursename:'Python'})
        for(let subcourse of subcourses)
        {
             course.subcourse.push(subcourse);
        }
      // const res =await course.save();
       
   

}
CourseDB().then(()=>
{
    mongoose.connection.close();
});


