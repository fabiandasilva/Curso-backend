const express = require("express");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/cart.routes");
const PORT = 8080;
const API_BASE_PATH = "/api";

const ProductManager = require("./productManager");
const CartManager = require("./cartManager");
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ==> ${PORT}`);
});

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});
