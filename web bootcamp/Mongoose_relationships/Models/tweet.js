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
    username:String,
    age:Number
})

const tweetSchema=new mongoose.Schema({
    text:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }
})

const User=mongoose.model('User',userSchema);
const Tweet=mongoose.model('Tweet',tweetSchema);

// const makeTweets=async()=>{
//     // const user=new User({username:'Tamilarasan',age:20});
//     const user=await User.findOne({name:'Tamilarasan'});
//     const tweet2=new Tweet({text:'Hey guys How are you all!!! and your chickens!',likes:234324 });
//     tweet2.user=user;
//     // await user.save();
//     await tweet2.save();
// }
// makeTweets();

const findTweet=async()=>{
    const tweet=await Tweet.find({}).populate('user','username');
    console.log(tweet);
}
findTweet();