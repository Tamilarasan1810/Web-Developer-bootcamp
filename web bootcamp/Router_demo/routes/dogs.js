const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("All Dog");
})

router.post('/',(req,res)=>{
    res.send("Creating Dog");
})

router.get('/:id',(req,res)=>{
    res.send("Viewing one Dog");
})

router.get('/:id/edit',(req,res)=>{
    res.send("edit one Dog");
})

module.exports=router;