const express = require('express');
const cookieParser=require('cookie-parser');
const app=express();


app.use(cookieParser('ThisismySecret'));

app.get('/greet',(req,res)=>{
    console.log(req.cookies);
    res.send("hey there")
})

app.get('/setname',(req,res)=>{
    console.log(req.cookies);
    res.cookie('name','Tamilarasan');
    res.cookie('animal','Harlaquin Shrimp');
    res.send("Ok name cookie set");
})

app.get('/verifyfruit',(req,res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

app.get('/getsignedcookie',(req,res)=>{
    res.cookie('fruit','grape',{signed:true});
    res.send("Signed cookie");
})

app.listen(3000,()=>{
    console.log('Serving on Port 3000');
})