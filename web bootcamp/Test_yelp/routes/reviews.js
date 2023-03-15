const express=require('express');
const router=express.Router({mergeParams:true});

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');


const Campground=require('../models/campground');
const Review=require('../models/review');

const {reviewSchema}=require('../schemas');

const {validateReview,isReviewAuthor,isLoggedIn}=require('../middleware');

//controllers :MVC

const reviews = require('../controllers/reviews');

//

// const validateReview=(req,res,next)=>{
   
//     const {error}=reviewSchema.validate(req.body);
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
// }  // these are shifted to middleware file



router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));


module.exports=router;