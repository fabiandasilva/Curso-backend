const productModel = require("../dao/models/product.model");

const getAllProducts = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);
  return newProduct;
};

const updateProduct = async (id, obj) => {
  const product = await productModel.updateOne({ _id: id }, obj);
  return product;
};

const deleteProduct = async (id) => {
  const product = await productModel.deleteOne({ _id: id });
  return product;
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
