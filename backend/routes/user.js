/** @format */

// import User from "../models/user";
const User = require("../models/user");
const ntuccLogin = require("./ntuccLogin.js");

// import User from "../models/user";
// import ntuccLogin from "./ntuccLogin.js";

exports.CreateUser = async (req, res) => {
  let data = req.body.user;
  User.create(data, (err, user) => {
    if (err) {
      console.log("create err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.CheckUser = async (req, res) => {
  let client_id = req.body.id;
  let client_password = req.body.password;
  let user_info;
  ntuccLogin(client_id, client_password, function onComplete(data) {
    user_info = JSON.parse(data);
    console.log(user_info);
    if (!user_info.result) {
      res.status(403).send({ message: "error", user: 0 });
    } else {
      User.find({ id: client_id }).exec((err, r) => {
        if (err) {
          console.log("find user by id gg");
        } else if (r === undefined || r.length === 0) {
          let data = {
            name: user_info.chinese_name,
            id: client_id,
            password: "fakepassword",
            sessionId: "123",
            courses: JSON.stringify([]),
          };
          User.create(data, (err, user) => {
            if (err) {
              console.log("create user err");
              // res.status(200).send({ message: "success", user: data });
            } else {
              console.log("create success");
              res.status(200).send({ message: "success", user: data });
            }
          });
        } else {
          res.status(200).send({ message: "success", user: r[0] });
        }
      });
    }
    // console.log(user_info.chinese_name)
  });
  // console.log(user_info)

  // User.find({ id: client_id }).exec((err, r) => {
  //   if (err) {
  //     res.status(403).send({ message: "error", user: 0 });
  //   } else if (r === undefined || r.length === 0) {
  //     res.status(200).send({ message: "invalid user", user: 0 });
  //   } else {
  //     if (r[0].password === client_password) {
  //       res.status(200).send({ message: "success", user: r[0] });
  //     } else {
  //       res.status(200).send({ message: "wrong password", user: 0 });
  //     }
  //   }
  // });
};

exports.UpdateUser = async (req, res) => {
  let client_id = req.body.id;
  let client_myCourse = req.body.myCourse;
  // console.log("update");
  // console.log(client_id);
  // console.log(client_myCourse);
  User.updateOne({ id: client_id }, { courses: client_myCourse }).exec(
    (err, r) => {
      if (err) {
        res.status(403).send({ message: "error", user: 0 });
        console.log(err);
      } else {
        res.status(200).send({ message: "success", user: r[0] });
        // console.log("success");
      }
    }
  );
};
