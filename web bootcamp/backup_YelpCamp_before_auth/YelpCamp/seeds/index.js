const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo db Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo db Connected Successfully");
    }
});


const sample=(array)=>{
    return array[Math.floor(Math.random()*array.length)];
}

const seedDB=async ()=>{
    await Campground.deleteMany({});
    
    for(let i=0;i<50;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const randprice=Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,       
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet illum harum commodi. Recusandae, iste voluptate? Repellat, sapiente cum tempore, distinctio velit asperiores, officia sequi in porro debitis minus sunt quos.',
            price:randprice
        })
        await camp.save();

    }
}
seedDB().then(()=>
{
    mongoose.connection.close();
});