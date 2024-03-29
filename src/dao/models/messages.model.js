const mongoose = require("mongoose");

const collectionName = "messages";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const messagesModel = mongoose.model(collectionName, messageSchema);
module.exports = messagesModel;
