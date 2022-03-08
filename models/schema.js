const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);


const messageSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  user: {
    type: String,
  },
  timeStamp: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    max: 300,
  },
  like: {
    type: Number,
  },
  valid: {
    type: Boolean,
  },
});

messageSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "id" });
const Message = mongoose.model("message", messageSchema);


module.exports = Message;
