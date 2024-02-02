const express = require("express");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/cart.routes");
const errorHandler = require("../src/middleware/error.middleware");
const API_BASE_PATH = "/api";
const config = require("./config/development");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
app.use(express.json()); // middleware global
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/../public"));
// console.log("Ruta statica ===>" + __dirname + "/public");

//Integro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "handlebars");
app.get("/home", (req, res) => {
  res.render("home");
});
// Fin de integracion de handlebars

//Integro socket.io
const httpServer = app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en ==> ${config.DOMAIN}:${config.PORT}`);
});
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id + "Usuario conectado");
  socket.on("disconnect", () => {
    console.log(socket.id + "Usuario desconectado");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});
// Fin de integracion de socket.io

app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenido!`);
});

// app.listen(config.PORT, () => {
//   console.log(`Servidor corriendo en ==> ${config.DOMAIN}:${config.PORT}`);
// });

app.use(errorHandler);

// app.get("*", (req, res) => {
//   res.send("404 Page Not Found");
// });
