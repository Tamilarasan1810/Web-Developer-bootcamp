const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const bcrypt=require('bcrypt');
const User=require('./models/user');
const session=require('express-session');


const app=express();
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/authDemo",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connected Successfully");
    }
});

app.set('view engine','ejs');
app.set('views','views');


app.use(express.urlencoded({extended:true}));
app.use(session({secret:"ItIsSecretKey",resave:false,saveUninitialized:true}))


const requireLogin=(req,res,next)=>{
    if(!req.session.user_id)
    {
        return res.redirect('/login');
    }
    next();
}

app.get('/',(req,res)=>{
    res.send("This is Home Page");
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.post('/register',async(req,res)=>{

    const{username,password}=req.body;
    // const hashpwd=await bcrypt.hash(password,12);
    // const user=User({username,password:hashpwd});
    const user=User({username,password});
    const result=await user.save();
    console.log(password);
    req.session.user_id=user._id;
    res.redirect('/');
})
app.post('/logout',(req,res)=>{
    // req.session.user_id=null; 
    req.session.destroy();
    res.redirect('/login');
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    // const user=await User.findOne({username:username});
    // const foundUser=await bcrypt.compare(password,user.password);
    const foundUser=await User.findAndValidate(username,password);

    if(foundUser)
    {
        req.session.user_id=foundUser._id;
        res.redirect('/secret');
    }
    else
    {
        res.redirect('/login');
    }
})

app.get('/secret',requireLogin,(req,res)=>{
    res.render('secret');
})





app.listen(3000,()=>{
    console.log("serving on port 3000!");
})