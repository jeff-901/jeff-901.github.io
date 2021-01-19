require("dotenv").config();
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

const mongoose = require("mongoose");

import User from "./models/user";
import Course from "./models/course";

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./backend/schema.graphql",
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    User,
    Course,
    pubsub,
  },
});

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("Graphql, MongoDB connected!");

  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`);
  });
});
