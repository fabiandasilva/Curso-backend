const mongoose = require("mongoose");

const collectionName = "carts";

const CartSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  // products: [
  //   {
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true
  //     },
  //   },
  // ],
});

CartSchema.pre("find", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model(collectionName, CartSchema);

module.exports = cartsModel;
