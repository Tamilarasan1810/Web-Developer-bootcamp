const express=require('express');
const app=express();
const morgan=require('morgan');



app.use(morgan('dev'));
app.use((req,res,next)=>{
    console.log("This is my first Middle ware!!!");
    next();
})


app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.get('/dog',(req,res)=>{
    res.send('Woof woof');
})


app.listen(3000,()=>{
    console.log("App is running a port 3000");
})