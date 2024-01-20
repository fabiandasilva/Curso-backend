const { Router } = require("express");

const router = Router();
const DB = require("../../db.json");

router.get(`/`, (req, res) => {
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
    products: DB.slice(0, limit),
  });
});

router.get(`/:pid`, (req, res) => {
  const id = Number(req.params.pid);
  const product = DB.find((product) => product.id === id);
  // console.log("id: ", id);

  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  return res.status(200).json({
    product,
  });
});

module.exports = router;
