const CartManager = require("../dao/cartManager");
const cartsModel = require("../dao/models/carts.model");
const productsModel = require("../dao/models/product.model");
const cartService = require("../service/carts.services");
const cartManager = new CartManager();

exports.getAllCart = async (req, res) => {
  try {
    const carts = await cartService.getCarts();

    return res.status(200).json({
      message: "Carritos encontrados",
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCartById = async (req, res) => {
  const { id } = req.params;

  try {
    const carts = await cartService.getProductInCartById(id);
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
    await cartService.createCart();
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductInCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const result = await cartService.addProductInCart(cid, pid);
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllProductsInCart = async (req, res) => {
  const id = req.params.cid;
  try {
    const cart = await cartsModel.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    await cartService.clearCart(id);

    return res.status(200).json({
      message: "Productos eliminados del carrito",
      carritoActualizado: cart,
    });
  } catch (error) {
    console.error("Error al eliminar productos del carrito:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar productos del carrito" });
  }
};

exports.deleteProductsInCartById = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const result = await cartService.deleteProductInCart(cartId, productId);
    
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ message: "Error al eliminar producto del carrito" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    if ((await cartsModel.findOne({ _id: req.params.cid })) !== undefined) {
      const newProducts = req.body.products;
      await cartsModel.updateOne(
        { _id: req.params.cid },
        { $set: { products: newProducts } }
      );

      res.json({
        ok: true,
        message: "La lista de productos fue actualizada",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
};

exports.updateProductsQuantityInCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const result = await cartService.updateProductQuantityInCart(cartId, productId, quantity);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar cantidad del producto en el carrito' });
  }
};
