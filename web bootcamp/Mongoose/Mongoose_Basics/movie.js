const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/movieApp",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connected Successfully");
    }
});

const movieSchema=new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
});

const Movie=mongoose.model('Movie',movieSchema);

// const amadeus=new Movie({
//     title:'Amadeus',
//     year:1986,
//     score:9.1,
//     rating:'U'
// });
// amadeus.save();
// console.log(amadeus);

//     Movie.insertMany(
//     [
//         {
//             title:'Amelie',
//             year:2001,
//             score:8.3,
//             rating:'U'
//         },
//         {
//             title:'Alien',
//             year:1979,
//             score:7.5,
//             rating:'A'
//         },
//         {
//             title:'The Iron Gaint',
//             year:1999,
//             score:9.6,
//             rating:'R'
//         },
//         {
//             title:'Stand By Me',
//             year:1986,
//             score:8.6,
//             rating:'R'
//         }
//     ]
// ).then((data)=>{
//     console.log("Data added successfully!");
//     console.log(data);
// })

//Movie.find().then(data=>console.log(data))
//Movie.find({rating:'A'}).then(data=>console.log(data))

// Movie.updateOne({title:'Amadeus'},{year:1984}).then(data=>console.log(data))

//Movie.updateMany({title:{$in:['Amadeus','Stand By Me' ]}},{rating:10}).then(data=>console.log(data))

//Movie.remove({title:'Amelie'}).then(msg=>console.log(msg))