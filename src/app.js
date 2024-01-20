const express = require("express");
const productsRoutes = require("./routes/products.routes");
const PORT = 3000;
const API_BASE_PATH = "/api";

const ProductManager = require("./productManager");
const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(express.json()); // middleware global

app.use(`${API_BASE_PATH}/products/`, productsRoutes);

app.use(`${API_BASE_PATH}/products/:pid`, productsRoutes);

app.get("/", (req, res) => {
  res.send("Tercera entrega");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});
