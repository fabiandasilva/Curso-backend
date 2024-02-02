const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getProductsInCart);
router.get("/:id", cartController.getProductInCartById);
router.post("/", cartController.createCart);
router.post("/:cid/products/:pid", cartController.addProductInCart);

module.exports = router;
