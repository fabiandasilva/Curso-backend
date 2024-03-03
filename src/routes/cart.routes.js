const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getProductsInCart);
router.get("/:id", cartController.getProductInCartById);
router.post("/", cartController.createCart);
router.post("/:cid/products/:pid", cartController.addProductInCart);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/products/:pid", cartController.updateProductsQuantityInCart);
router.delete("/:cid/products/:pid", cartController.deleteProductsInCartById);
router.delete("/:cid", cartController.deleteAllProductsInCart);

module.exports = router;
