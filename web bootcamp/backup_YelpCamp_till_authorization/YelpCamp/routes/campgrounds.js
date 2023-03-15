const express=require('express');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Campground=require('../models/campground');
const {campgroundSchema}=require('../schemas');
const {isLoggedIn,validateCampground,isAuthor}=require('../middleware');

const mongoose=require('mongoose');
const Joi = require('joi');


const router=express.Router();


// const validateCampground=(req,res,next)=>{
   
//     const {error}=campgroundSchema.validate(req.body);
//     if(error)
//     {
//         const msg=error.details.map(ele=>ele.message).join(',');
//         throw new ExpressError(msg,400);
//     }
//     else{
//         next();
//     }

// }

// const isAuthor=async(req,res,next)=>{
//     const {id}=req.params;
//     const campground=await Campground.findById(id);
//     if(!campground.author.equals(req.user._id))
//     {
//         req.flash('error',"You don't have permission to do that : (");
//         return res.redirect(`/campgrounds/${id}`);
//     }
//     next();
// }// these middleware are moved to middleware file

 
 router.get('/',async(req,res)=>{
     const campgrounds=await Campground.find({});
     res.render('campgrounds/index',{campgrounds});
 })
 router.get('/new',isLoggedIn,(req,res)=>{

    // if(!req.isAuthenticated())
    // {
    //     req.flash('error','You must be Signed-in');
    //     return res.redirect('/login');
    // }
    res.render('campgrounds/new');
 })
 
 router.post('/',isLoggedIn,validateCampground,catchAsync(async(req,res)=>{
     //if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
     const  campground=new Campground(req.body.campground);
     campground.author=req.user._id;  //adding user id to newely created campground => author
     await campground.save();
     req.flash('success',"Successfully Made a New Campground!");
     res.redirect(`/campgrounds/${campground._id}`);
    
 }))
 
 router.get('/:id',catchAsync(async(req,res)=>{
     const {id}=req.params;
     //const campground=await Campground.findById(id).populate('reviews').populate('author');
    const campground=await Campground.findById(id).populate({
        path:'reviews',
        populate:{path:'author'}
    }).populate('author');
        
    //  console.log(campground);
     if(!campground){
        req.flash('error',"OHH, Campground Not Found :(");
       return  res.redirect('/campgrounds');
     }
     res.render('campgrounds/show',{campground});
 }))
 
 router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(async(req,res)=>
 {
     const {id}=req.params;
     const campground=await Campground.findById(id);
     if(!campground){
        req.flash('error',"OHH, Campground Not Found, You cann't edit :(");
       return  res.redirect('/campgrounds');
     }
     res.render('campgrounds/edit',{campground});
 }))
 
 router.put('/:id',isLoggedIn,isAuthor,validateCampground,catchAsync(async(req,res)=>{
     const {id}=req.params;
     const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground});
     req.flash('success',"Successfully Updated Campground!");
     res.redirect(`/campgrounds/${campground._id}`);
 }))
 
 router.delete('/:id',isLoggedIn,isAuthor,catchAsync(async(req,res)=>{
     const {id}=req.params;
     
     const campground=await Campground.findByIdAndDelete(id);
     console.log(campground.title);
     req.flash('success',"Successfully Deleted Campground!");

     res.redirect('/campgrounds');
 }))

 module.exports=router;