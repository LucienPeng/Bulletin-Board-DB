var mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

var ItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
});

ItemSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "order" });
var ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;



// let newItem2 = new ItemModel({
//   text: "text2",
//   key: "key2",
//   status: "A",
// });
// newItem2.save();

// let newItem3 = new ItemModel({
//   text: "text3",
//   key: "key3",
//   status: "B",
// });
// newItem3.save();
