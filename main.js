const data = require("./models/data.js");
const Message = require("./models/schema.js");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const username = encodeURIComponent("lucien");
const password = encodeURIComponent("/nxfl7zp");
const database = encodeURIComponent("TW_Railway");
//const uri = `mongodb+srv://${username}:${password}@lucien-db.vk4rb.mongodb.net/${database}?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.log(e);
  });

// CORS config here
app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("留言板ＤＢ已經成功連線！！！");
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server is running...QUE DIEU SOIT AVEC NOUS!!!!")
);
