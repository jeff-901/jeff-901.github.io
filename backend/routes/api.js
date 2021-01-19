const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const courseRoute = require("./course");
const commentRoute = require("./comment");
const tagRoute = require("./tag");
// const User = require("../models/user");
// const Course = require("../models/course");
// const Comment = require("../models/comment");

const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

// router.post("/createUser", wrap(userRoute.CreateUser));
// router.post("/checkUser", wrap(userRoute.CheckUser));
// router.post("/updateUser", wrap(userRoute.UpdateUser));
// router.post("/findCourse", wrap(courseRoute.findCourse));
// router.post("/createComment", wrap(commentRoute.createComment));
// router.post("/findComment", wrap(commentRoute.findComment));
router.post("/createUser", wrap(userRoute.CreateUser));
router.post("/checkUser", wrap(userRoute.CheckUser));
router.post("/updateUser", wrap(userRoute.UpdateUser));
router.post("/findCourse", wrap(courseRoute.findCourse));
router.post("/updateCourse", wrap(courseRoute.updateCourse));
router.post("/createComment", wrap(commentRoute.createComment));
router.post("/findComment", wrap(commentRoute.findComment));
router.post("/updateComment", wrap(commentRoute.updateComment));
router.post("/deleteComment", wrap(commentRoute.deleteComment));
router.post("/findUserComment", wrap(commentRoute.findUserComment));
router.post("/createTag", wrap(tagRoute.createTag));
router.post("/findTag", wrap(tagRoute.findTag));
router.post("/deleteTag", wrap(tagRoute.deleteTag));

module.exports = router;
