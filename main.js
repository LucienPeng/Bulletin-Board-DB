const data = require("./models/data.js");
const Message = require("./models/schema.js");
// const ItemModel = require("./models/testSchema.js");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const username = encodeURIComponent("lucien");
const password = encodeURIComponent("/nxfl7zp");
const database = encodeURIComponent("Bulletin_board");
const uri = `mongodb+srv://${username}:${password}@bulletin-board.4mgev.mongodb.net/${database}?retryWrites=true&w=majority`;

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

//Find All Data
app.get("/all", async (req, res) => {
  try {
    let data = await Message.find(
      {},
      {
        id: 1,
        user: 1,
        timeStamp: 1,
        topic: 1,
        content: 1,
        like: 1,
        valid: 1,
        _id: 0,
      }
    );
    await res.send(data);
  } catch (e) {
    console.log(e);
  }
});

//Find Topic
app.get("/topic/:topic", async (req, res) => {
  let { topic } = req.params;
  try {
    let data = await Message.find(
      { topic },
      {
        id: 1,
        user: 1,
        timeStamp: 1,
        topic: 1,
        content: 1,
        like: 1,
        valid: 1,
        _id: 0,
      }
    );
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

//Find User
app.get("/user/:user", async (req, res) => {
  let { user } = req.params;
  try {
    let data = await Message.find(
      { user },
      {
        id: 1,
        user: 1,
        timeStamp: 1,
        topic: 1,
        content: 1,
        like: 1,
        valid: 1,
        _id: 0,
      }
    );
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

//Delete User
app.post("/deleteUser/:user", async (req, res) => {
  let { user } = req.params;
  try {
    Message.deleteMany({ user: user }, function (err) {
      if (err) return handleError(err);
      res.send("Data has been removed !");
    });
  } catch (e) {
    console.log(e);
  }
});

//Delete Topic
app.post("/deleteTopic/:topic", async (req, res) => {
  let { topic } = req.params;
  try {
    Message.deleteMany({ topic: topic }, function (err) {
      if (err) return handleError(err);
      res.send("Data has been removed !");
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/add", async (req, res) => {
  for (let i = 0; i < data.length; i++) {
    let { id, user, timeStamp, topic, content, like, valid } = req.body;
    let newMessage = new Message({
      id,
      user,
      timeStamp,
      topic,
      content,
      like,
      valid,
    });
    await newMessage
      .save()
      .then(() => {
        //res.send(`Your message has been saved`);
        console.log(`Message has been saved`);
      })
      .catch((e) => {
        console.log(`Message is not accepted.`);
        console.log(e);
        res.send(e);
      });
  }
});

// app.post("/add", async (req, res) => {
//   let { id, user, timeStamp, topic, content, like, valid } = req.body;
//   let newMessage = new Message({
//     id: 0,
//     user: "Ella",
//     timeStamp: "2022/03/04 13:54:04",
//     topic: "Test",
//     content: "Test",
//     like: 2,
//     valid: true,
//   });
//   await newMessage
//     .save()
//     .then(() => {
//       res.send(`Your message has been saved`);
//       console.log(`Message has been saved`);
//     })
//     .catch((e) => {
//       console.log(`Message is not accepted.`);
//       console.log(e);
//       res.send(e);
//     });
// });

// app.post("/add", async (req, res) => {
//   for (let i = 0; i < data.length; i++) {
//     let newMessage = new Message({
//       id: data[i].id,
//       user: data[i].user,
//       timeStamp: data[i].timeStamp,
//       topic: data[i].topic,
//       content: data[i].content,
//       like: data[i].like,
//       valid: data[i].valid,
//     });
//     await newMessage
//       .save()
//       .then(() => {
//         //res.send(`Your message has been saved`);
//         console.log(`Message has been saved`);
//       })
//       .catch((e) => {
//         console.log(`Message is not accepted.`);
//         console.log(e);
//         res.send(e);
//       });
//   }
// });

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...Go! Go! GO!")
);
