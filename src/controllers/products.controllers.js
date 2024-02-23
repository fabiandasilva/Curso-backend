const ProductManager = require("../dao/productManager");
const uploader = require("../utils/multer");
const productsModel = require("../dao/models/product.model");
const manager = new ProductManager();
const uploaderFile = uploader.array("thumbnail");

// exports.getProducts = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const {
//     products,
//     totalDocs,
//     limit: limitPag,
//     totalPages,
//     hasPrevPage,
//     hasNextPage,
//     nextPage,
//     prevPage,
//   } = await productsModel.paginate({}, { page, limit });

//   // let products = await productsModel.find().limit(Number(limit));

//   if (isNaN(limit)) {
//     return res.status(400).json({
//       error: "El límite debe ser un número",
//     });
//   } else if (limit < 1) {
//     return res.status(400).json({
//       error: "El límite debe ser mayor a 0",
//     });
//   }

//   return res.status(200).json({
//     status: "success",
//     mesaage: "Productos obtenidos exitosamente",
//     products: products,
//     length: totalDocs,
//     limit: limitPag,
//     page: page,
//     totalPages,
//     hasNextPage,
//     nextPage,
//     hasPrevPage,
//     prevPage,
//   });
// };

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const {
    docs: products,
    totalDocs,
    limit: limitPag,
    totalPages,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await productsModel.paginate({}, { page, limit });

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
    status: "success",
    mesaage: "Productos obtenidos exitosamente",
    products: products,
    length: totalDocs,
    limit: limitPag,
    page: page,
    totalPages,
    hasNextPage,
    nextPage,
    hasPrevPage,
    prevPage,
  });
};

exports.getProductById = async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await productsModel.findById({ _id: id });
    return res.status(200).json({
      mesaage: "Producto obtenido exitosamente",
      product: product,
    });
  } catch (error) {
    console.error("Error en la ruta GET /:id:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { title, description, thumbnail, price, category, code, stock } =
    req.body;
  const status = true;
  const priceNumber = Number(price);
  const stockNumber = Number(stock);
  const codeExist = await productsModel.findOne({
    code: code,
  });

  if (codeExist) {
    return res.status(400).json({
      error: "El código ya existe",
    });
  }

  if (isNaN(priceNumber) || isNaN(stockNumber)) {
    return res.status(400).send("Precio y stock deben ser números");
  }

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
  const id = req.params.pid;
  const { title, description, price, thumbnail, code, category, stock } =
    req.body;
  const newProductToReplace = {
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock,
  };

  try {
    await productsModel.updateOne({ _id: id }, newProductToReplace);
    await manager.updateProduct(id, newProductToReplace);
    return res.status(200).json({
      message: "Producto actualizado exitosamente",
      Actualizado: newProductToReplace,
    });
  } catch (error) {
    console.error("Error en la ruta PUT:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.pid;

  try {
    await productsModel.deleteOne({ _id: id });
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
