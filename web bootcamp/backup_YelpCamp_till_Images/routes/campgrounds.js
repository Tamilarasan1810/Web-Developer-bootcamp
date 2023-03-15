const express=require('express');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const Campground=require('../models/campground');
const {campgroundSchema}=require('../schemas');
const {isLoggedIn,validateCampground,isAuthor}=require('../middleware');

//controllers :MVC
const campgrounds =  require('../controllers/campgrounds');

//

const multer = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({storage});



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

 
 router.get('/',catchAsync(campgrounds.index))

 router.get('/new',isLoggedIn,campgrounds.renderNewForm)
 
  router.post('/',isLoggedIn,upload.array('image'),validateCampground ,catchAsync(campgrounds.createCampground))
// router.post('/',upload.array('image') ,(req,res)=>{
//     console.log(req.body, req.files);
//     res.send("");
// })


 router.get('/:id',catchAsync(campgrounds.showCampground))
 
 router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))
 
 router.put('/:id',isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
 
 router.delete('/:id',isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

 module.exports=router;