const CartManager = require("../dao/cartManager");
const cartsModel = require("../dao/models/carts.model");
const productsModel = require("../dao/models/product.model");
const cartManager = new CartManager();

exports.getProductsInCart = async (req, res) => {
  try {
    const carts = await cartManager.getProductsInCart();
    return res.status(200).json({
      message: "Carritos encontrados",
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductInCartById = async (req, res) => {
  const { id } = req.params;

  try {
    const carts = await cartsModel.findById(id);
    return res.status(200).json({
      message: "Carrito encontrado",
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductInCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    await cartManager.addProductInCart(cid, pid);
    res.status(201).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
