const cartModel = require("../dao/models/carts.model");
const productsModel = require("../dao/models/product.model");

const getCarts = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getProductInCartById = async (id) => {
  const carts = await cartModel.findById(id);
  return carts.products;
};

const createCart = async () => {
  const newCart = new cartModel({ products: [] });
  await newCart.save();
  return newCart;
};

const addProductInCart = async (cid, pid) => {
  try {
    const existingProduct = await cartModel.findOne({
      _id: cid,
      "products.productId": pid,
    });

    if (existingProduct) {
      await cartModel.updateOne(
        { _id: cid, "products.productId": pid },
        { $inc: { "products.$.quantity": 1 } }
      );
    } else {
      await cartModel.updateOne(
        { _id: cid },
        { $push: { products: { productId: pid, quantity: 1 } } }
      );
    }

    return { success: true, message: "Producto agregado al carrito" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const clearCart = async (cid) => {
  try {
    await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
    return { success: true, message: "Carrito vaciado" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteProductInCart = async (cid, pid) => {
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return { success: false, message: "Carrito no encontrado" };
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === pid
    );

    if (productIndex === -1) {
      return {
        success: false,
        message: "Producto no encontrado en el carrito",
      };
    }

    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();

    return { success: true, message: "Producto eliminado del carrito" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateQuantityProduct = async (cartId, productId, quantity) => {
  try {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return { success: false, message: 'Carrito no encontrado' };
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!product) {
      return { success: false, message: 'Producto no encontrado en el carrito' };
    }

    const productToUpdate = await productsModel.findById(productId);
    if (!productToUpdate) {
      return { success: false, message: 'Producto no encontrado' };
    }

    const stock = productToUpdate.stock;
    if (quantity > stock) {
      return { success: false, message: 'No hay suficiente stock para la cantidad solicitada' };
    }

    product.quantity = quantity;
    await cart.save();

    return { success: true, message: 'Cantidad del producto actualizada exitosamente' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
 

module.exports = {
  getCarts,
  getProductInCartById,
  createCart,
  addProductInCart,
  clearCart,
  deleteProductInCart,
  updateQuantityProduct
};
