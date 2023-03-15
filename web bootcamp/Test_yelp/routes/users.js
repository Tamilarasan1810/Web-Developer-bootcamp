const express=require('express');
const router=express.Router();
const User=require('../models/user');
const  catchAsync=require('../utils/catchAsync');
const passport=require('passport');

//controllers :MVC

const users = require('../controllers/users');

//

router.get('/register',users.renderRegisterForm)

router.post('/register',catchAsync(users.registerUser))

router.get('/login',users.renderLoginForm)

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login',keepSessionInfo: true}),users.loginUser)

router.get('/logout', users.logoutUser); 

module.exports=router;