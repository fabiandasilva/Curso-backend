const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const collectionName = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productSchema);

module.exports = productsModel;
