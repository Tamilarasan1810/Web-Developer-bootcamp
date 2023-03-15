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

const personSchema= new mongoose.Schema({
    first:String,
    last:String
})

personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last}`;
});

personSchema.pre('save',async function(){
    this.last= `${this.first} ${this.last}`;
    this.first="Yo";
    
    console.log("About to SAVE");
})
personSchema.post('save',async function(){
    console.log("Just Saved!!!");
})


const Person=mongoose.model('Person',personSchema);