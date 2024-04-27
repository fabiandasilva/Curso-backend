const express = require("express");
const router = express.Router();
const mockingProductsController = require("../controllers/mockingproducts");

router.get("/mockingproducts", mockingProductsController.getAllMockingProducts);

module.exports = router;
