const userModel = require("../dao/models/users.model");

const createUser = (user) => {
  return userModel.create(user);
};

const findUser = (email) => {
  return userModel.findOne({ email }).lean();
};

module.exports = {
  createUser,
  findUser,
};
