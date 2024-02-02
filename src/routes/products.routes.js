const express = require("express");
const router = express.Router();
const uploader = require("../utils/multer");
const productController = require("../controllers/products.controllers");

router.get(`/`, productController.getProducts);
router.get(`/:pid`, productController.getProductById);
router.post("/", uploader.array("thumbnail"), productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
