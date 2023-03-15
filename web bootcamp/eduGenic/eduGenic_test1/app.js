const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");

const Course = require("./models/course");
const Faculty = require("./models/faculty");
const Subcourse = require("./models/subcourse");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/eduGenic_1",
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_mehtod"));
//app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req, res) => {
  res.send("hello there");
});

app.get("/course", async (req, res) => {
  const courses = await Course.find({});
  //console.log(courses);
  res.render("course/index.ejs", { courses });
});

app.get("/course/new", (req, res) => {
  res.render("course/new");
});

app.post("/course/new", async (req, res) => {
  res.send(req.body);
});

app.get("/course/:id/show", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate("subcourse");
  // console.log(course);
  res.render("course/show", { course });
});

app.get("/subcourse/:subcourseId/show", async (req, res) => {
  const { subcourseId } = req.params;
  const subcourse = await Subcourse.findById(subcourseId);
  // console.log(subcourse)
  res.render("subcourse/show", { subcourse });
});

app.get("/faculty", async (req, res) => {
  const faculties = await Faculty.find({});
  res.render("faculty/index", { faculties });
});

app.get("/faculty/:id/show", async (req, res) => {
  const { id } = req.params;
  const faculty = await Faculty.findById(id);
  const courses = await Course.find({})
    .populate("coursename")
    .populate("faculty");
  // const facultyCourses = [];
  // for (let c of courses) {
  //   if (String(c.faculty._id) == String(faculty._id)) {
  //     console.log(c._id);
  //     facultyCourses.push(c._id);
  //   }
  // }

  const facultyCourses = courses.filter(
    (c) => String(c.faculty._id) == String(faculty._id)
  );
  //console.log(facultyCourses);
  // console.log(facultyCourses.length);
  //console.log(courses);
  //console.log(faculty);
  //res.send("hello faculyt");
  //console.log(facultyCourses[0].faculty.username);
  if (!facultyCourses.length) {
    res.send("No courses found :(");
  } else {
    res.render("faculty/show", { facultyCourses });
  }
});

app.listen(3000, () => {
  console.log("Server is Up and Running");
});
