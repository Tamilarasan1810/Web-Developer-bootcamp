const express= require("express");
const { get, ServerResponse, Server } = require("http");
const app=express();
const path=require('path');
const methodOverride=require('method-override');

//requiring uuid to generate random id
const {v4:uuid}=require('uuid');
uuid();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/tocos',(req,res)=>{
    // console.log(req.query);
    const {meat,qty}=req.query;
    console.log(`Here is your ${qty} ${meat} tocos `);
    res.send(`Here is your ${qty} ${meat} tocos `);
})

app.post('/tocos',(req,res)=>{
    // console.log(req.body);
    const {meat,qty}=req.body;
    console.log(`Here is your ${qty} ${meat} tocos `);
    res.send(`Here is your ${qty} ${meat} tocos `);
})


let comments=[
    {
        id:uuid(),
        username:'Todd',
        comment:'lol that is so funny!'
    },
    {
        id:uuid(),
        username:'skyler',
        comment:'I like to go birdwathchin with my Dog'
    },
    {
        id:uuid(),
        username:'onlysayswoof',
        comment:'woof woof woof'
    },
    {
        id:uuid(),
        username:'sk8erBoi',
        comment:'please delete this account'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    //using uuid to generate unique id for each comment
    //npm i uuid
    comments.push({id:uuid(),username:username,comment:comment});
    // res.send("it works!");
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
   // console.log(comment.id);
    res.render('comments/show',{comment});
})
app.patch('/comments/:id',(req,res)=>{
//to use patch method in form do the folling
// > npm install method-override
     const{id}=req.params;
    const newCommentText=(req.body.comment);
    console.log(req.body.comment);
    const oldComment=comments.find(c=>c.id===id);
    oldComment.comment=newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/edit',{comment});

})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    // console.log(" ");
    const comment=comments.find(c=>c.id===id);
    console.log("op ");
    console.log(comment=comments.find(c=>c.id===id));
    console.log(" ");
    console.log("op ");
    // console.log(comment.id);
   // console.log(comment);
    res.render('comments/edit',{comment});
})

app.delete('/comments/:id',(req,res)=>
{
    const {id}=req.params;
    comments=comments.filter(c=>c.id!==id);
    console.log(comments);
    res.redirect('/comments');
})

app.listen(3000,()=>{
    console.log("You are listening to Port 3000!!!")
})



// Name        path            verb    purpose

// index   /comments           get     Display all comments
// New     /comments/new       get     Form to create new comment
// create  /comments           post    create new comments on Server
// show    /comments/:id       get     details for one specific comment
// edit    /comments/:id/edit  get     form to edit specific comment
// update  /comments/:id       patch   update specific comment on Server
// delete  /comments/:id       delete  delelte specific comment on Server 

