const express = require("express");
const cors = require("cors");
const apiRoutes = require("./backend/routes/api");
const path = require("path");
// import userRoute from "./routes/user";
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

const bodyParser = require("body-parser");
// init middleware
// app.use(cors());
// app.use(express.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(express.static(path.join(__dirname, "build")));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use("/api", apiRoutes);

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 80;
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10,
};
// TODO : connect mongodb here
mongoose.connect(process.env.MONGO_URL, dboptions);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("MongoDB connected!");

  //   routes(app);
  app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
  });
});
