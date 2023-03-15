const express=require('express');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Campground=require('../models/campground');
const {campgroundSchema}=require('../schemas');

const mongoose=require('mongoose');
const Joi = require('joi');


const router=express.Router();


const validateCampground=(req,res,next)=>{
   
    const {error}=campgroundSchema.validate(req.body);
    if(error)
    {
        const msg=error.details.map(ele=>ele.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }

}

 
 router.get('/',async(req,res)=>{
     const campgrounds=await Campground.find({});
     res.render('campgrounds/index',{campgrounds});
 })
 router.get('/new',(req,res)=>{
     res.render('campgrounds/new');
 })
 
 router.post('/',validateCampground,catchAsync(async(req,res)=>{
     //if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
 
     
     const  campground=new Campground(req.body.campground);
     await campground.save();
     req.flash('success',"Successfully Made a New Campground!");
     res.redirect(`/campgrounds/${campground._id}`);
    
 }))
 
 router.get('/:id',catchAsync(async(req,res)=>{
     const {id}=req.params;
     const campground=await Campground.findById(id).populate('reviews');
     if(!campground){
        req.flash('error',"OHH, Campground Not Found :(");
       return  res.redirect('/campgrounds');
     }
     res.render('campgrounds/show',{campground});
 }))
 
 router.get('/:id/edit',catchAsync(async(req,res)=>
 {
     const {id}=req.params;
     const campground=await Campground.findById(id);
     if(!campground){
        req.flash('error',"OHH, Campground Not Found, You cann't edit :(");
       return  res.redirect('/campgrounds');
     }
     res.render('campgrounds/edit',{campground});
 }))
 
 router.put('/:id',validateCampground,catchAsync(async(req,res)=>{
     const {id}=req.params;
     const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground});
     req.flash('success',"Successfully Updated Campground!");
     res.redirect(`/campgrounds/${campground._id}`);
 }))
 
 router.delete('/:id',catchAsync(async(req,res)=>{
     const {id}=req.params;
     
     const campground=await Campground.findByIdAndDelete(id);
     console.log(campground.title);
     req.flash('success',"Successfully Deleted Campground!");

     res.redirect('/campgrounds');
 }))

 module.exports=router;