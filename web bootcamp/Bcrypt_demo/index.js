const bcrypt=require('bcrypt');

const hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(12);
    const hashPassword=await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashPassword);
  
}
const login=async(password,hashPassword)=>{
    const res=await bcrypt.compare(password,hashPassword);
    console.log(res);
    if(res)
    {
        console.log('Your are logged in!!');
    }
    else
    {
        console.log("Invalid password");
    }
}
const hashpwd='$2b$12$I7PKTuEvn2pnK5DR1HBlV.fWw2MoTjysDa2Fv1RpSUPiIiAHbV2ey';

login('Tamilarasan',hashpwd);


// hashPassword('Tamilarasan');