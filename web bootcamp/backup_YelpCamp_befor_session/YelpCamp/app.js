const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const Joi = require('joi');
const ejsMate=require('ejs-mate');
const catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const Campground=require('./models/campground');
const campground = require('./models/campground');
const {campgroundSchema,reviewSchema}=require('./schemas');
const Review=require('./models/review');
const campgroundsRouter = require('./routes/campgrounds');
const reviewsRouter=require('./routes/reviews');

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo db Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo db Connected Successfully");
    }
});

const app=express();
app.use(express.urlencoded({extended:true}));

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_mehtod'));
app.use(express.static(path.join(__dirname,'public'))); 





app.get('/',async(req,res)=>{
    
   res.render('home');
   
})

app.use('/campgrounds',campgroundsRouter);

app.use('/campgrounds/:id/reviews',reviewsRouter);

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const {statusCode = 500}=err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error',{err});
   // res.send("Oh It seems an error occured");
})

app.listen(3000,()=>{
    console.log('Serving on Port 3000');
})