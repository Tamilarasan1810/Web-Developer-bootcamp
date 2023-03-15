const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');
const campgroundsRouter = require('./routes/campgrounds');
const reviewsRouter=require('./routes/reviews');
const session=require('express-session');
const flash=require('connect-flash');

const Campground=require('./models/campground');
const {campgroundSchema,reviewSchema}=require('./schemas');
const Review=require('./models/review');
const Joi = require('joi');
const catchAsync=require('./utils/catchAsync');





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

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_mehtod'));
app.use(express.static(path.join(__dirname,'public'))); 
const sessionConfig={
    secret:"ThisIsSecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use((req,res,next)=>{
   res.locals.success= req.flash('success');
   res.locals.error=req.flash('error');
   next();
})



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