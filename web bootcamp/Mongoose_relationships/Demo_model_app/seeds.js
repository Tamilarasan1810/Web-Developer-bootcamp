const Product=require('./models/product');

const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/farmStand",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo Connected Successfully");
    }
});

// const p=new Product({name:'grapes',price:2.01,category:'fruit'});
// p.save().then((data)=>{
//     console.log(data);
//     }).catch((err)=>{
//     console.log("oh an error");
//     console.log(err);
//     });
const seedProducts=[
    {
        name:'Egg plant',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'Organic Melon',
        price:4.09,
        category:'fruit'
    },
    {
        name:'Celery',
        price:4.28,
        category:'vegetable'
    },
    {
        name:'Chocolate Milk',
        price:2.87,
        category:'dairy'
    }
];

Product.insertMany(seedProducts)
.then(res=>console.log(res))
.catch(err=>console.log(err));