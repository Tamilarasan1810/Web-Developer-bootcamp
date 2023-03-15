const Campground=require('../models/campground');


module.exports.index = async(req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}

module.exports.renderNewForm = (req,res)=>{
    // if(!req.isAuthenticated())
    // {
    //     req.flash('error','You must be Signed-in');
    //     return res.redirect('/login');
    // }
    res.render('campgrounds/new');
 }

 module.exports.createCampground = async(req,res)=>{
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
    const  campground=new Campground(req.body.campground);
    campground.author=req.user._id;  //adding user id to newely created campground => author
    await campground.save();
    req.flash('success',"Successfully Made a New Campground!");
    res.redirect(`/campgrounds/${campground._id}`);
   
}

module.exports.showCampground = async(req,res)=>{
    const {id}=req.params;
    //const campground=await Campground.findById(id).populate('reviews').populate('author');
   const campground=await Campground.findById(id).populate({
       path:'reviews',
       populate:{path:'author'}
   }).populate('author');
       
   //  console.log(campground);
   if(!campground){
       req.flash('error',"OHH, Campground Not Found :(");
      return  res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}

module.exports.renderEditForm = async(req,res)=>
{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    if(!campground){
       req.flash('error',"OHH, Campground Not Found, You cann't edit :(");
      return  res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}

module.exports.updateCampground = async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground});
    req.flash('success',"Successfully Updated Campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async(req,res)=>{
    const {id}=req.params;
    
    const campground=await Campground.findByIdAndDelete(id);
    console.log(campground.title);
    req.flash('success',"Successfully Deleted Campground!");

    res.redirect('/campgrounds');
}