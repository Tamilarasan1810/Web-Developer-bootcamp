if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//  console.log(process.env.MAPBOX_TOKEN);

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const campgroundsRouter = require("./routes/campgrounds");
const reviewsRouter = require("./routes/reviews");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRouter = require("./routes/users");
const helmet = require("helmet");

const Campground = require("./models/campground");
const { campgroundSchema, reviewSchema } = require("./schemas");
const Review = require("./models/review");
const Joi = require("joi");
const catchAsync = require("./utils/catchAsync");

const mongoSanitize = require("express-mongo-sanitize");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/yelp-camp",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Mongo db Connection error");
      console.log(err);
    } else {
      console.log("Mongo db Connected Successfully");
    }
  }
);

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_mehtod"));
app.use(express.static(path.join(__dirname, "public")));
const sessionConfig = {
  name: "Session",
  secret: "ThisIsSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
// app.use(helmet());
// const scriptSrcUrls = [
//   "https://stackpath.bootstrapcdn.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://api.mapbox.com/",
//   "https://kit.fontawesome.com/",
//   "https://cdnjs.cloudflare.com/",
//   "https://cdn.jsdelivr.net",
// ];
// //This is the array that needs added to
// const styleSrcUrls = [
//   "https://kit-free.fontawesome.com/",
//   "https://api.mapbox.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://fonts.googleapis.com/",
//   "https://use.fontawesome.com/",
//   "https://cdn.jsdelivr.net",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com/",
//   "https://a.tiles.mapbox.com/",
//   "https://b.tiles.mapbox.com/",
//   "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       objectSrc: [],
//       imgSrc: [
//         "'self'",
//         "blob:",
//         "data:",
//         "https://res.cloudinary.com/duoguvmno/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//         "https://images.unsplash.com/",
//       ],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // console.log("hey");
  //console.log("from app.js",req.session.returnTo);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", async (req, res) => {
  res.render("home");
});

// app.get('/fakeuser',async(req,res)=>{
//     const fakeuser=new User({email:'tamilarasan1mst@gmail.com',username:'Tamilarasan'});
//     const newUser = await User.register(fakeuser,'fakepassword');
//     res.send(newUser);
// })

app.use("/campgrounds", campgroundsRouter);

app.use("/campgrounds/:id/reviews", reviewsRouter);

app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
  // res.send("Oh It seems an error occured");
});

app.listen(3000, () => {
  console.log("Serving on Port 3000");
});

// cp -R YelpCamp backup_YelpCamp_till_starRating
