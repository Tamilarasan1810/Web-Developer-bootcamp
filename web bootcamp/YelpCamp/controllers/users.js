const User=require('../models/user');

module.exports.renderRegisterForm = (req,res)=>{
    res.render('auth/register');
}

module.exports.registerUser = async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const user=new User({email,username});
        const registeredUser = await User.register(user,password);
       // console.log(registeredUser);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
       
    }catch(err){
        req.flash('error',err.message);
        res.redirect('/register');
    }
    
}

module.exports.renderLoginForm = (req,res)=>{
    res.render('auth/login');
}

module.exports.loginUser = (req,res)=>{
    req.flash('success',"Welcome Back!");
    const redirectUrl=req.session.returnTo || '/campgrounds';
   // console.log("***************\n",redirectUrl,"\n****************************\n");
     delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Successfully Logged Out!");
      res.redirect('/campgrounds');
    });
  }

