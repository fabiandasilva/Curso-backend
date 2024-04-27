import productModel from "../model/product.model.js";

export default class ProductRepositoryDao {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = async () => {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      console.log("🚀 ~ ProductRepositoryDao ~ getAllProducts= ~ error:", error)
      throw error;
    }
  };

  getProductById = async (pId) => {
    try {
      const productData = await productModel.findById({ _id: pId });
      return productData;
    } catch (error) {
      console.log("🚀 ~ ProductRepositoryDao ~ getProductById= ~ error:", error)
      throw error;
    }
  };

  createProduct = async (productBodyDto) => {
    try {
      const newProduct = await productModel.create(productBodyDto);
      return newProduct;
    } catch (error) {
      console.log("🚀 ~ ProductRepositoryDao ~ createProduct= ~ error:", error)
      throw error;
    }
  };

  deleteProductById = async (pId) => {
    try {
      const deleteP = await productModel.deleteOne({ _id: pId });
      return deleteP;
    } catch (error) {
      console.log("🚀 ~ ProductRepositoryDao ~ deleteProductById ~ error:", error)
      throw error;
    }
  };
}
