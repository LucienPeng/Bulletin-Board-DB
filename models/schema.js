const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
  },
  valid: {
    type: Boolean,
    required: true,
  },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
