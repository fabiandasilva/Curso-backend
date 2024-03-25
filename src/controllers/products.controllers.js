const ProductManager = require("../dao/productManager");
const uploader = require("../utils/multer");
const productsModel = require("../dao/models/product.model");
const productService = require("../service/products.services");
const manager = new ProductManager();
const uploaderFile = uploader.array("thumbnail");

exports.getProductsCtrl = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category = "",
    sort = "asc",
    price = 0,
  } = req.query;

  const query = {};
  if (category) {
    query.category = category;
  } else if (price) {
    query.price = price;
  }

  const sortOption = sort === "desc" ? { price: -1 } : { price: 1 };

  const options = { page, limit, sort: sortOption };

  const productList = await productService.getAllProducts(query, options);

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
    message: "Productos obtenidos exitosamente",
    payload: productList.docs,
    totalPages: productList.totalPages,
    prevPage: productList.prevPage,
    nextPage: productList.nextPage,
    page: productList.page,
    hasNextPage: productList.hasNextPage,
    hasPrevPage: productList.hasPrevPage,
    length: productList.totalDocs,
    limit: productList.limit,
  });
};

exports.getProductByIdCtrl = async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await productService.getProductById(id);
    return res.status(200).json({
      mesaage: "Producto obtenido exitosamente",
      product: product,
    });
  } catch (error) {
    console.error("Error en la ruta GET /:id:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addProductCtrl = async (req, res) => {
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
    const newProduct = await productService.createProduct({
      title,
      description,
      price: priceNumber,
      thumbnail,
      category,
      code,
      stock: stockNumber,
      status,
    });

    await manager.addProduct(newProduct);

    return res.status(201).json({
      message: "Producto agregado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.error("Ocurrio un erro: ", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateProductCtrl = async (req, res) => {
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
    await productService.updateProduct({ _id: id }, newProductToReplace);

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

exports.deleteProductCtrl = async (req, res) => {
  const id = req.params.pid;

  try {
    await productService.deleteProduct({ _id: id });

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
