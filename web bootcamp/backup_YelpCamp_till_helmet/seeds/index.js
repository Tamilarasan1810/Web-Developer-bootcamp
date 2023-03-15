const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

//Mapbox
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapBoxToken = process.env.mapBoxToken;
// console.log(mapBoxToken);
// const geoCoder = mbxGeocoding({accessToken:mapBoxToken});
//
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
    
    for(let i=0;i<200;i++)
    {


        const random1000=Math.floor(Math.random()*1000);
        const randprice=Math.floor(Math.random()*20)+10;
        //
        
         

          //
        const camp= new Campground({
            author:'63eb80699f34986b41a349f2',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            geometry:{
                    type:'Point',
                    coordinates:[cities[random1000].longitude,cities[random1000].latitude]  
                 },   
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet illum harum commodi. Recusandae, iste voluptate? Repellat, sapiente cum tempore, distinctio velit asperiores, officia sequi in porro debitis minus sunt quos.',
            price:randprice,
            images:[
                {
                    url: 'https://res.cloudinary.com/duoguvmno/image/upload/v1676471648/YelpCamp/hksh2vhvxtl6dh1apqh5.jpg',
                    filename: 'YelpCamp/hksh2vhvxtl6dh1apqh5',
                },
                {
                  url: 'https://res.cloudinary.com/duoguvmno/image/upload/v1676471648/YelpCamp/tb7caupv1shgleaz7cqt.jpg',
                  filename: 'YelpCamp/tb7caupv1shgleaz7cqt',
                }
                
              ]
        })
        //mapbox
        // loc=`${cities[random1000].city}, ${cities[random1000].state}`;
        // const geoData =await geoCoder.forwardGeocode({
        //     query: loc,
        //     limit: 1
        //   }).send();
        // camp.geometry=geoData.body.features[0].geometry,    
        //mapbox
        await camp.save();

    }
}
seedDB().then(()=>
{
    mongoose.connection.close();
});