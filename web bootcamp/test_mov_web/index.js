const express=require('express');
const app=express();
const path=require('path');
// const mehtodOverride=require('method-override');


const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/newMovie",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo Connected Successfully");
    }
});



const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    
});

const Movie=mongoose.model('Movie',movieSchema);


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
// app.use(mehtodOverride('_method'));

// const new2=new Movie({name:'birds',path:'/videos/animal.mp4'});
// new2.save().then(data=>console.log(data));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/search',async (req,res)=>{
    const movies=await Movie.find({});
   // console.log(movies);
    res.render('search');
})

function findMovie(allmovie,reqMovieName)
{
   // console.log(allmovie);
   // console.log(reqMovieName);
    for(let i of allmovie)
    {
        if(i.name==reqMovieName)
        {
          //  console.log(i);
            return i;
        }
    }
    return 'nothing';
}

app.post('/show',async(req,res)=>{
    const id=req.body.name;
    const allmovie=await Movie.find({});
    //const movie=await Movie.find({name:`${id.name}`}).then(res=>console.log(res));
    //console.log(movie);
   const movie= findMovie(allmovie,id);
    
    // const movie=allmovie.name.filter(id.name)
    // console.log(movie);
    res.render('show',{movie});
})



app.listen(3000,()=>{
    console.log("App is Listening on port 3000");
});
