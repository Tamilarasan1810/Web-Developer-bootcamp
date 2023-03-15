const mongoose=require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review=require('./review');
const Schema=mongoose.Schema;

const CampgroundSchema=new Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete',async function(camp_doc){
    if(camp_doc)
    {
        await Review.deleteMany({
            _id:{
                $in:camp_doc.reviews
            }
        })
    }

})

module.exports=mongoose.model('Campground',CampgroundSchema);