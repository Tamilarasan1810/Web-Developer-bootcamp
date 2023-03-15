const express=require('express');
const router=express.Router({mergeParams:true});

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');


const Campground=require('../models/campground');
const Review=require('../models/review');

const {reviewSchema}=require('../schemas');

const {validateReview,isReviewAuthor,isLoggedIn}=require('../middleware');

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



router.post('/',isLoggedIn,validateReview,catchAsync(async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success',"Created New Review!");

    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    const review=await Review.findByIdAndDelete(reviewId);
    req.flash('success',"Review Deleted Successfully!");

    res.redirect(`/campgrounds/${id}`);
}))


module.exports=router;