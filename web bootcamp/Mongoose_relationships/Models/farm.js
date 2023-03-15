const mongoose=require('mongoose');
const {Schema}=mongoose;
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/relationshipDB",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo db Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo db Connected Successfully");
    }
});

const productSchema=new Schema({
    name:String,
    price:Number,
    season:{
        type:String,
        enum:['Spring','Summer','Fall','Winter']
    }
})

const farmSchema=new Schema({
    name:String,
    city:String,
    products:[{type: Schema.Types.ObjectId,ref:'Product'}]
})
const Product=mongoose.model('Product',productSchema);

const Farm=mongoose.model('Farm',farmSchema);

// Product.insertMany([
//     { name:'Melon', price:4, season:'Summer'},
//     {  name:'Sweet Corn', price:2, season:'Fall'},
//     {  name:'Apple', price:7, season:'Winter'}
// ])

// const makeFarm=async()=>{
//     const newFarm=new Farm({name:'Berry Farms',city:'Namakkal'});
//     const Melon=await Product.findOne({name:'Melon'});
//     newFarm.products.push(Melon);
//     const res=await newFarm.save();
//     console.log(res);
// }
// makeFarm();

const addProduct=async()=>{
    const farm=await Farm.findOne({name:'Berry Farms'});
    const product=await Product.findOne({name:'Apple'});
    farm.products.push(product);
    const res=await farm.save();
    console.log(res);
}
// addProduct();

Farm.findOne({name:'Berry Farms'})
.populate('products')
.then(farm=>console.log(farm));
