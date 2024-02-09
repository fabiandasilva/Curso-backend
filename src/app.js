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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/../public"));


//Integro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "handlebars");
app.get("/realtimeproducts", (req, res) => {
  res.render("home");
});
// Fin de integracion de handlebars

//Integro socket.io
const httpServer = app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en ==> ${config.DOMAIN}:${config.PORT}`);
});
const io = new Server(httpServer);

io.on("connection", (socket) => {

  socket.on("formulario", (datos) => {
    console.log("Datos del formulario recibidos:", datos);

    io.emit("update-products", datos);
  });


  socket.on("error", (error) => {
    console.log("Error al recibir el evento:", error);
  });

});

// Fin de integracion de socket.io

app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenido!`);
});



app.use(errorHandler);

