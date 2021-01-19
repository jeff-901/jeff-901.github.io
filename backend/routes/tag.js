/** @format */

const Tag = require("../models/tag");

exports.createTag = async (req, res) => {
  let data = req.body.tag; // array of tags { title: string }
  // console.log(data);
  Tag.create(data, (err, tag) => {
    if (err) {
      console.log("create tag err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.findTag = async (req, res) => {
  let result = await Tag.find();
  // console.log(result);
  res.status(200).send({ tags: result });
};

exports.deleteTag = async (req, res) => {
  await Tag.deleteOne({ title: req.body.tag }, (err) => {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
  // console.log(result);
};
