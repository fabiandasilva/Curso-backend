const ProductManager = require("../productManager");
const DB = require("../../product.db.json")
const manager = new ProductManager();

exports.getProducts = (req, res) => {
  const limit = req.query.limit || 10;

  if (isNaN(limit)) {
    return res.status(400).json({
      error: "El límite debe ser un número",
    });
  } else if (limit < 1) {
    return res.status(400).json({
      error: "El límite debe ser mayor a 0",
    });
  }

  return res.status(200).json({
    products: DB.slice(0, limit),
  });
};

exports.addProduct = async (req, res) => {
  const { title, description, price, category, code, stock } = req.body;
  const thumbnail = req.files.map((file) => file.filename);
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
};

exports.updateProduct = async (req, res) => {
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
};

exports.deleteProduct = async (req, res) => {
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
};

exports.getProductById = (req, res) => {
  const id = Number(req.params.pid);
  const product = DB.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }

  return res.status(200).json({
    product,
  });
};
