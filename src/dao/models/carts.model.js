const mongoose = require("mongoose");

const collectionName = "carts";

const CartSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const cartsModel = mongoose.model(collectionName, CartSchema);

module.exports = cartsModel;
