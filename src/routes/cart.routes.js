const express = require("express");
const router = express.Router();

const CartManager = require("../cartManager");
const DB_CART = require("../../cart.db.json");

const manager = new CartManager();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;

  if (isNaN(limit)) {
    return res.status(400).json({
      error: "El limite debe ser un numero",
    });
  } else if (limit < 1) {
    return res.status(400).json({
      error: "El limite debe ser mayor a 0",
    });
  }

  return res.status(200).json({
    Cart: DB_CART.slice(0, limit),
  });
});

router.post("/", async (req, res) => {
  try {
    manager.createCart();
    return res.status(200).json({
      message: "Carrito creado",
    });
  } catch (error) {
    console.error("Error en la ruta POST:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const findCart = DB_CART.find((cart) => cart.id === Number(req.params.cid));
    if (!findCart) {
      throw new Error("El carrito no existe");
    }
    return res.status(200).json({
      message: "Carrito encontrado",
      data: findCart,
    });
  } catch (error) {
    console.error("Error en la ruta GET:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    manager.addProductInCart(cartId, productId);

    return res.status(200).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta POST:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
