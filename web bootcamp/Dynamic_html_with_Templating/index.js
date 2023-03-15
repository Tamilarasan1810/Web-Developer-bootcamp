// npm init
//npm install express
// To run use  => nodemon index.js  or node index.js
const express= require ("express");
const path=require('path');

const redditData=require("./data.json");
// console.log(redditData);

const app=express();


app.use(express.static(path.join(__dirname,'public')));


//npm install ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit}=req.params;
    const data=redditData[subreddit];
    if(data)
    {
        res.render('subreddit',{...data});
    }
    else
    {
        res.render('notfound',{subreddit});
    }
    
})

app.get('/rand',(req,res)=>{
    const num=Math.floor(Math.random()*10)+1;
    res.render('random.ejs',{rand:num});
})

app.get('/cats',(req,res)=>{
    const cats=[
        'Blue','Rocket','Monty','Stephanine','Winston'
    ];
    console.log(cats);
   res.render('cats',{cats:cats});
})

app.listen(3000,(req,res)=>{
    console.log("Listening on port 3000!!!");
});
