const express = require("express");
require("dotenv").config();
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
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/../public"));

//Integro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "handlebars");
app.get("/chat", (req, res) => {
  res.render("chat");
});
// Fin de integracion de handlebars

//Integro socket.io
// const httpServer = app.listen(PORT, () => {
//   console.log(`Servidor corriendo en ==> ${HOST}:${PORT}`);
//   displayRoutes(app);
// });
// const io = new Server(httpServer);
// io.on("connection", (socket) => {
//   console.log("Nuevo usuario conectado");

//   socket.on("sendMessage", (data) => {
//     console.log("Mensaje recibido:", data);

//     io.emit("receiveMessage", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado");
//   });
// });

// Fin de integracion de socket.io

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ==> ${HOST}:${PORT}`);
  displayRoutes(app);
});
app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);
app.use(`${API_BASE_PATH}/message`, messageRoutes);
// app.use(`${API_BASE_PATH}/students`, studentsRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenido!`);
});

const connection = mongoose
  .connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`)
  // .connect(process.env.URI_ATLAS)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });

app.use(errorHandler);
