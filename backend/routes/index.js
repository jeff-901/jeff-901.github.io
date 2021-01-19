/** @format */

import userRoute from "./user";
import courseRoute from "./course";
import commentRoute from "./comment";
import tagRoute from "./tag";
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

function main(app) {
  app.post("/api/createUser", wrap(userRoute.CreateUser));
  app.post("/api/checkUser", wrap(userRoute.CheckUser));
  app.post("/api/updateUser", wrap(userRoute.UpdateUser));
  app.post("/api/findCourse", wrap(courseRoute.findCourse));
  app.post("/api/updateCourse", wrap(courseRoute.updateCourse));
  app.post("/api/createComment", wrap(commentRoute.createComment));
  app.post("/api/findComment", wrap(commentRoute.findComment));
  app.post("/api/updateComment", wrap(commentRoute.updateComment));
  app.post("/api/deleteComment", wrap(commentRoute.deleteComment));
  app.post("/api/findUserComment", wrap(commentRoute.findUserComment));
  app.post("/api/createTag", wrap(tagRoute.createTag));
  app.post("/api/findTag", wrap(tagRoute.findTag));
  app.post("/api/deleteTag", wrap(tagRoute.deleteTag));
}

export default main;
