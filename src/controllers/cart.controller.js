const { json } = require("express");
const CartManager = require("../cartManager");
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
  try {
    const carts = await cartManager.getProductInCartById(req.params.id);
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

exports.addProductInCart = (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    cartManager.addProductInCart(cartId, productId);

    return res.status(200).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta POST:", error);
    res.status(500).json({ error: error.message });
  }
};
