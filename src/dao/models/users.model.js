const mongoose = require("mongoose");
const collection = "users";
const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  role: {
    type: String,
    default: "user",
    require: true
  }
});

const usersModel = mongoose.model(collection, userSchema);

module.exports = usersModel;
