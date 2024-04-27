import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  thumbnail: { type: String, default: 'Sin imagen' },
  status: { type: Boolean, default: true },
});

schema.plugin(mongoosePaginate);
const productModel = mongoose.model(collection, schema);
export default productModel;
