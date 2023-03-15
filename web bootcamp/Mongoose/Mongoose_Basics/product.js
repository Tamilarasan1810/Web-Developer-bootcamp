const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/shopApp",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connected Successfully");
    }
});

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    price:{
        type:Number,
        required:true,
        minvalue:0
    },
    onSale:{
        type:Boolean,
        default:false
    },
    categories:{
        type:[String]
    },
    qty:{
        online:{
            type:Number,
            default:0
        },
        inStore:{
            type:Number,
            default:0
        }
    }
});




productSchema.methods.greet=function(){
    console.log("hello Method works");
    console.log(`from - ${this.name} Product :)`)
}

productSchema.methods.toggleOnSale=function(){
    this.onSale=!this.onSale;
    return this.save();
}

productSchema.methods.addCategory=function(newCategories){
    this.categories.push(...newCategories);
    return this.save();
}

productSchema.statics.fireSale=function(){
   return this.updateMany({},{onSale:true,price:0});
}



const Product=mongoose.model('Product',productSchema);

Product.fireSale().then(res=>console.log(res));


const findProducts =  async()=>{
   const foundProuct= await Product.findOne({name:'test'});
//    await foundProuct.greet();
    console.log(foundProuct);
    await foundProuct.toggleOnSale();
    console.log(foundProuct);
    var cat=['Pucher Kit','Healmet','Mud Gurad'];
    await foundProuct.addCategory(cat);
    console.log(foundProuct);
}
//findProducts();


//  const findProduct = async () => {     
//     const foundProduct = await Product.findOne({price:250});
//         await foundProduct.greet();   
//         console.log(foundProduct); 
//     }; 
//  findProduct();




// const bike=new Product({name:'Moutain Bike',price:599});

// const bike=new Product({name:'Tyre Pump',price:250,onSale:true,categories:['Cycling','Two Wheeler','Air pump']});
// bike.save().then((data)=>{
//     console.log("it worked");
//     console.log(data);
// }).catch(err=>{
//     console.log("OH NO Error ");
//     console.log(err);
// });


// Product.findOneAndUpdate({name:'Tyre Pump'},{price:132},{new:true,runValidators:true})
// .then((data)=>{
//     console.log("It worked");
//     console.log(data);
// }).catch(err=>{
//     console.log("Error while updating the data");
//     console.log(err);
// })

