/** @format */

// import Comment from "../models/comment";
const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  let data = req.body.comment;
  console.log(data);
  Comment.create(data, (err, comment) => {
    if (err) {
      console.log("create comment err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.findComment = async (req, res) => {
  let id = req.body.id;
  let user = req.body.user;
  // console.log(req.body);
  // console.log(id);
  let comment = await Comment.find({ username: user, id: id });
  let comments = await Comment.find({ id: id });
  res.status(200).send({ comment: comment, comments: comments });
};

exports.deleteComment = async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  // console.log(req.body);
  // console.log(id);
  await Comment.deleteOne({ id: id, username: username }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
  // res.status(200).send({ comments: result });
};

exports.findUserComment = async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  // console.log(id);
  // console.log(username);
  let comment = await Comment.findOne(
    { id: id, username: username },
    function (err) {
      if (err) {
        res.status(200).send({ message: "error" });
      }
    }
  );
  // console.log("findUserComment", comment);
  res.status(200).send({ message: "success", comment: comment });
  // res.status(200).send({ comments: result });
};

exports.updateComment = async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let new_comment = req.body.comment;
  // console.log(id);
  // console.log(username);
  await Comment.updateOne(
    { id: id, username: username },
    new_comment,
    function (err) {
      if (err) {
        console.log(err)
        res.status(200).send({ message: "error" });
      }
    }
  );
  // console.log("findUserComment", comment);
  res.status(200).send({ message: "success" });
  // res.status(200).send({ comments: result });
};
