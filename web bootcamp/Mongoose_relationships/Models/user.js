const mongoose=require('mongoose');
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

const userSchema=new mongoose.Schema({
    first:String,
    last:String,
    addresses:[{
        street:String,
        city:String,
        state:String,
        country:String
    }]    
})

const User= mongoose.model('User',userSchema);

const makeUser=async ()=>{
    const u=new User({
        first:'Tamil',
        last:'arasan'
    });
    u.addresses.push({
        _id:{id:false},
        street:'6/157, Neikkaranpatti',
        city:'Namakkal',
        state:'Tamilnadu',
        country:'India'
    })
    const res=await u.save();
    console.log(res);
}
// makeUser();

const addAddress=async(id)=>{
    const user=await User.findById(id);
    user.addresses.push({
        street:'56, west street',
        city:'Chennai',
        state:'Tamilnadu',
        country:'India',
    });
    const res=await user.save();
    console.log(res);
}
addAddress("63e518013b0b15e52798b3f8");