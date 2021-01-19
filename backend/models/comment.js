/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const CommentSchema = new Schema({
  //發布人學號
  username: {
    type: String,
    required: [true, "userName field is required."],
  },
  //comment id (courseName + professor)
  id: {
    type: String,
    required: [true, "Id field is required."],
  },
  recomendation: {
    type: String,
    required: [true, "recomendation field is required."],
  },
  semester: {
    type: String,
    required: [true, "semester field is required."],
  },
  // 上課用書
  book: {
    type: String,
    required: [true, "book field is required."],
  },
  // 上課方式
  teachingStyle: {
    type: String,
    required: [true, "teachingStyle field is required."],
  },
  // 評分
  grading: {
    type: String,
    required: [true, "grading field is required."],
  },
  // 考試題型、作業方式
  homework: {
    type: String,
    required: [true, "homework field is required."],
  },
  // 其他
  other: {
    type: String,
    required: false,
  },
  // 一句話總結
  conclusion: {
    type: String,
    required: [true, "conclusion field is required."],
  },
  tag_1: {
    type: String,
    required: [true, "tag1 field is required."],
  },
  tag_2: {
    type: String,
    required: false, // [true, "tag2 field is required."],
  },
  tag_3: {
    type: String,
    required: false, // [true, "tag3 field is required."],
  },
});

// Creating a table within database with the defined schema
const Comment = mongoose.model("comment", CommentSchema);

// Exporting table for querying and mutating
module.exports = Comment;
