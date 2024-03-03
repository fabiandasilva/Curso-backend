const express = require("express");
const cartsModel = require("../dao/models/carts.model");
const productsModel = require("../dao/models/product.model");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/register", (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log("Error al renderizar el formulario de registro:", error);
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  const user = req.session.user;
  try {
    res.render("profile", { user });
  } catch (error) {
    console.log("Error al renderizar el profile:", error);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log("Error al renderizar el login:", error);
  }
});

router.get("/products", async (req, res) => {
  const prods = await productsModel.find().lean();
  const user = req.session.user;
  console.log("🚀 ~ file: views.routes.js:64 ~ router.get ~ user", user);

  res.render("products", { products: prods, user: user });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsModel.findOne({ _id: cid }).lean();
    // console.log("resultado", cart);
    res.render("carts", { carts: [cart] });
  } catch (error) {
    console.error("Error al buscar el carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
});
module.exports = router;
