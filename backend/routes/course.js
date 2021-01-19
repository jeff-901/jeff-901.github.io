// import Course from "../models/course";
const Course = require("../models/course");

exports.findCourse = async (req, res) => {
  // console.log("findCourse");
  // console.log("Course: ", Course);

  // console.log(req.body);
  let constrain = req.body.constrain;
  console.log("constrain: ", constrain);
  let filter = {};
  for (let i = 0; i < Object.keys(constrain).length; i++) {
    let key = Object.keys(constrain)[i];
    if (key.match(/time.*/)) {
      filter[key] = {
        $not: { $regex: constrain[key] },
      };
    } else {
      filter[key] = {
        $regex: constrain[key],
      };
    }
  }
  // console.log(filter);
  let result = await Course.find(filter).sort({ id: 1 });
  // console.log("result: ", result);
  // return { courses: result };
  res.status(200).send({ courses: result });
};

exports.updateCourse = async (req, res) => {
  let courseName = req.body.courseName;
  let professor = req.body.professor;
  let tags = req.body.tags;
  // console.log("tags: ", tags);
  await Course.updateMany(
    { courseName: courseName, professor: professor },
    { tags: tags },
    (err) => {
      if (err) {
        res.status(200).send({ message: "error" });
      }
    }
  );
  res.status(200).send({ message: "success" });
};
