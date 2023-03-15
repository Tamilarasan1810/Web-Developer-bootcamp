const {reviewSchema,campgroundSchema}=require('./schemas');
const Campground=require('./models/campground');
const Review =require('./models/review');
const User=require('./models/user');
const ExpressError=require('./utils/ExpressError');
const isLoggedIn=(req,res,next)=>{
    // console.log("Req.User...",req.user);
    if(!req.isAuthenticated())
    {
        req.session.returnTo=req.originalUrl;
        //console.log(req.path,req.originalUrl);
        req.flash('error','You must be Signed-in First !!!');
        return res.redirect('/login');
    }
    next();
}

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


const validateReview=(req,res,next)=>{
   
    const {error}=reviewSchema.validate(req.body);
    if(error)
    {
        const msg=error.details.map(ele=>ele.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

const isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    if(!campground.author.equals(req.user._id))
    {
        req.flash('error',"You don't have permission to do that : (");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

const isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id))
    {
        req.flash('error',"You don't have permission to do that : (");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports={ isLoggedIn, isAuthor,isReviewAuthor, validateReview, validateCampground};