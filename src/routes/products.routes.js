const express = require("express");
const router = express.Router();
// const uploader = require("../utils/multer");
const productController = require("../controllers/products.controllers");

router.get(`/`, productController.getProductsCtrl);
router.get(`/:pid`, productController.getProductByIdCtrl);
router.post(
  "/",
  /* uploader.array("thumbnail"), */ productController.addProductCtrl
);

router.put("/:pid", productController.updateProductCtrl);
router.delete("/:pid", productController.deleteProductCtrl);

module.exports = router;
