const mongoose = require("mongoose");
const collection = "users";
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
});

const usersModel = mongoose.model(collection, userSchema);

module.exports = usersModel;
