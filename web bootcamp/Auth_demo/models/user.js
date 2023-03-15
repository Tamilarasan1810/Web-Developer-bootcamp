const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        require:[true,'User name Can not be blank']
    },
    password:{
        type:String,
        require:[true,'Password Must be Specified']
    }
});

userSchema.statics.findAndValidate=async function(uname,pwd)
{
    const foundUser=await this.findOne({username:uname});
    const isValid=await bcrypt.compare(pwd,foundUser.password);
    return isValid?foundUser:false;

}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
      this.password=await bcrypt.hash(this.password,12);
    next();
})

const User=mongoose.model('User',userSchema);
module.exports=User;