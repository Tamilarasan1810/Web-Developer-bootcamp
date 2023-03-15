const express=require('express');
const app=express();
const path=require('path');
const mehtodOverride=require('method-override');
//mongoose part
const Product=require('./models/product');

const Farm=require('./models/farm');


const mongoose=require("mongoose");
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/farmStand_2",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("Mongo Connection error");
        console.log(err);
    }
    else{
        console.log("Mongo Connected Successfully");
    }
});
//mongoose part^^

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(mehtodOverride('_method'));

///Farm routes

app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
})

app.get('/farms',async(req,res)=>{
    const farms=await Farm.find({});
    res.render('farms/index',{farms});
})

app.get('/farms/:id',async(req,res)=>{
    const {id}=req.params
    const farm=await Farm.findById(id).populate('products');

    res.render('farms/show',{farm});
})

app.delete('/farms/:id',async(req,res)=>{
    const {id}=req.params;
    console.log("deleting");
    const deleted_farm=await Farm.findByIdAndDelete(id);
    res.redirect('/farms');
})


app.post('/farms',async(req,res)=>{
    const farm=new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})

app.get('/farms/:id/products/new',async(req,res)=>{
    const {id}=req.params;
    const farm=await Farm.findById(id);
    res.render('products/new',{categories,farm});
})

app.post('/farms/:id/products',async(req,res)=>{
    const {name,price,category}=req.body;
    const{id}=req.params;
    
    const farm=await Farm.findById(id);
    console.log(farm);
    const product=new Product({name,price,category});
    farm.products.push(product);
    product.farm=farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`);

})

///Product routes

const categories=['fruit','vegetable','dairy','greens'];

// shows all product
app.get('/products',async (req,res)=>{

    const {category}=req.query;
    if(category)
    {
        const products = await Product.find({category:category});
        res.render('products/index',{ products,category });
    }
    else
    {
        const products = await Product.find({});
        res.render('products/index',{ products,category:'All' });
    }

    

    //console.log(products);
   
})

//serves add product form
app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

//adds products to database
app.post('/products',async(req,res)=>{
    //console.log(req.body);
   const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

//shows single product
app.get('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const product = await Product.findById(id).populate('farm','name');
    console.log(product);
    res.render('products/show',{product});
})

//edit existing product
app.get('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product,categories});
})

//Delete existing product
app.delete('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const deletedProduct= await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

// to use put patch and delete use npm install method-override
//to update product on database
app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const updatedProduct=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});

    console.log(req.body);
    res.redirect(`/products/${updatedProduct._id}`);
})

///
app.listen(3000,()=>{
    console.log("App is Listening on port 3000");
});
