/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const TagSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title field is required."],
  },
});

// Creating a table within database with the defined schema
const Tag = mongoose.model("tag", TagSchema);

// Exporting table for querying and mutating
module.exports = Tag;
