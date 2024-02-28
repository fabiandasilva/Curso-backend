require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/cart.routes");
const messageRoutes = require("./routes/message.routes");
const handlebars = require("express-handlebars");
const errorHandler = require("../src/middleware/error.middleware");
const API_BASE_PATH = "/api";
const path = require("path");
const displayRoutes = require("express-routemap");
const { PORT, HOST, DB_PORT, DB_NAME } = require("./config/constant");
const productsModel = require("./dao/models/product.model");
const cartsModel = require("./dao/models/carts.model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/../public"));

//Integro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "handlebars");
app.get("/products", async (req, res) => {
  const prods = await productsModel.find().lean();
  res.render("products", { products: prods });
});

app.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  // console.log(cid, "id");
  try {
    const cart = await cartsModel.findOne({ _id: cid }).lean();
    // console.log("resultado", cart);
    res.render("carts", { carts: [cart] });
  } catch (error) {
    console.error("Error al buscar el carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ==> ${HOST}:${PORT}`);
  displayRoutes(app);
});
app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);
app.use(`${API_BASE_PATH}/message`, messageRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenido!`);
});

const connection = mongoose
  // .connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`)
  .connect(process.env.URI_ATLAS)
  .then(() => {
    // let findProducts = productsModel
    //   .paginate({ category: "Electrónicos" }, { limit: 2, page: 1 })
    //   .then((result) => {
    //     console.log("result", result);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });

    console.log("Conexión a MongoDB exitosa");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });

app.use(errorHandler);
