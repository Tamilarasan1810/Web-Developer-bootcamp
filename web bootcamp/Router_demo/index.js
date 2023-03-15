const express = require('express');
const shelterRoutes=require('./routes/shelters');
const dogRoutes=require('./routes/dogs');
const adminRoutes=require('./routes/admin');

const app=express();



app.use('/shelters',shelterRoutes);
app.use('/dogs',dogRoutes);
app.use('/admin',adminRoutes);
app.listen(3000,()=>{
    console.log('Serving on Port 3000');
})