const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: [true, "className field is required."],
  },
  semester: {
    type: String,
    required: [true, "semester field is required."],
  },
  //   授課對象
  department: {
    type: String,
    required: false,
  },
  professor: {
    type: String,
    required: [true, "professor field is required."],
  },
  //   課號
  course_code: {
    type: String,
    required: [true, "course_code field is required."],
  },
  //   課程識別碼
  id: {
    type: String,
    required: [true, "id field is required."],
  },
  //   班次
  class: {
    type: String,
    required: false,
  },
  //   學分
  credit: {
    type: String,
    required: [true, "credit field is required."],
  },
  //   全半
  fullHalf: {
    type: String,
    required: false,
  },
  //   選必
  compulsoryRequired: {
    type: String,
    required: false,
  },
  //   ------時間------
  //   星期一
  day1: {
    type: Boolean,
    required: [true, "day1 field is required."],
  },
  day2: {
    type: Boolean,
    required: [true, "day2 field is required."],
  },
  day3: {
    type: Boolean,
    required: [true, "day3 field is required."],
  },
  day4: {
    type: Boolean,
    required: [true, "day4 field is required."],
  },
  day5: {
    type: Boolean,
    required: [true, "day5 field is required."],
  },
  //   節次
  time1: {
    type: String,
    required: false,
  },
  time2: {
    type: String,
    required: false,
  },
  time3: {
    type: String,
    required: false,
  },
  time4: {
    type: String,
    required: false,
  },
  time5: {
    type: String,
    required: false,
  },
  //   人數
  people: {
    type: Number,
    required: false,
  },
  //   初選人數
  peopleChosing: {
    type: Number,
    required: false,
  },
  //   教室
  classroom: {
    type: String,
    required: false,
  },
  //   加選方式
  add: {
    type: String,
    required: false,
  },
  //   備註
  remark: {
    type: String,
    required: false,
  },
  ceiba: {
    type: String,
    required: false,
  },
  //   課程概述
  description: {
    type: String,
    required: false,
  },
  //   課程目標
  objective: {
    type: String,
    required: false,
  },
});

// Creating a table within database with the defined schema
const Course = mongoose.model("course", CourseSchema);

// Exporting table for querying and mutating
module.exports = Course;
