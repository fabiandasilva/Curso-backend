const express = require("express");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/cart.routes");
const errorHandler = require("../src/middleware/error.middleware");
const API_BASE_PATH = "/api";
const config = require("./config/development");

const app = express();
app.use(express.json()); // middleware global
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/../public"));
// console.log("Ruta statica ===>" + __dirname + "/public");

app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenido!`);
});

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en ==> ${config.DOMAIN}:${config.PORT}`);
});

app.use(errorHandler);

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});
