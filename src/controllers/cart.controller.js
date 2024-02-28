const CartManager = require("../dao/cartManager");
const cartsModel = require("../dao/models/carts.model");
const productsModel = require("../dao/models/product.model");
const { deleteOne } = require("../dao/models/product.model");
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
      data: carts.products,
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
    const getProduct = await productsModel.findById(pid);
    await cartManager.addProductInCart(cid, pid);
    res
      .status(201)
      .json({ message: "Producto agregado al carrito", payload: getProduct });
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

    await cartsModel.updateOne({ _id: id }, { $set: { products: [] } });

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
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    const product = cart.products[productIndex];

    if (product.quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();

    return res.status(200).json({
      message: "Producto eliminado del carrito",
      productIdEliminado: productId,
    });
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
    const cart = await cartsModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!product) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    const productToUpdate = await productsModel.findById(productId);
    if (!productToUpdate) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const stock = productToUpdate.stock;
    if (quantity > stock) {
      return res.status(400).json({
        message: "No hay suficiente stock para la cantidad solicitada",
      });
    }

    product.quantity = quantity;

    await cart.save();

    const newProductToReplace = await cartsModel.findById(cartId);

    return res.status(200).json({
      message: "Cantidad del producto actualizado exitosamente",
      Actualizado: newProductToReplace,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
};
