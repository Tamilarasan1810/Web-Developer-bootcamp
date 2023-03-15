const express=require('express');
const router=express.Router();
const User=require('../models/user');
const  catchAsync=require('../utils/catchAsync');
const passport=require('passport');

router.get('/register',(req,res)=>{
    res.render('auth/register');
})
router.post('/register',catchAsync(async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const user=new User({email,username});
        const registeredUser = await User.register(user,password);
        console.log(registeredUser);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
       
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/register');
    }
    
}))

router.get('/login',(req,res)=>{
    res.render('auth/login');
})
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login',keepSessionInfo: true}),(req,res)=>{
    req.flash('success',"Welcome Back!");
    const redirectUrl=req.session.returnTo || '/campgrounds';
   // console.log("***************\n",redirectUrl,"\n****************************\n");
     delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Successfully Logged Out!");
      res.redirect('/campgrounds');
    });
  }); 

module.exports=router;