const { Router } = require("express");
const ProductManager = require("../productManager");
const manager = new ProductManager();

const router = Router();
const DB = require("../../product.db.json");
const uploader = require("../utils/utils");

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

//Post de productos
// const fields = {
//   title: "titulo",
//   description: "descripcion",
//   price: "precio",
//   thumbnail: "thumbnail",
//   code: "codigo",
//   stock: "stock",
// };

// for (const [field, name] of Object.entries(fields)) {
//   if (!req.body[field]) {
//     console.log(`falta el ${name}`);
//     return res.status(400).json({
//       error: `Falta el ${name}`,
//     });
//   }
// }

router.post("/", uploader.array("thumbnail"), async (req, res) => {
  const { title, description, price, category, code, stock } = req.body;
  const thumbnail = req.files.map((file) => file.filename);
  // console.log("Nombre de la imagen", thumbnail);
  const status = true;

  try {
    await manager.addProduct(
      title,
      description,
      price,
      thumbnail,
      category,
      code,
      stock,
      status
    );
    return res.status(201).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta POST:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const { title, description, price, thumbnail, code, category, stock } =
    req.body;

  try {
    await manager.updateProduct(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      stock,
    });
    return res.status(200).json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta PUT:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);

  try {
    await manager.deleteProduct(id);
    return res.status(200).json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error en la ruta DELETE:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
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
