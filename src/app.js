require("dotenv").config();

const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products.routes");
const cartsRoutes = require("./routes/cart.routes");
const messageRoutes = require("./routes/message.routes");
const cookieRoutes = require("./routes/cookies.routes");
const handlebarsRoutes = require("./routes/views.routes");
const sessionRoutes = require("./routes/session.routes");
const session = require("express-session");
const handlebars = require("express-handlebars");
const errorHandler = require("../src/middleware/error.middleware");
const path = require("path");
const displayRoutes = require("express-routemap");
const initializePassport = require("./config/passport.config");
const {
  PORT,
  HOST,
  DB_PORT,
  DB_NAME,
  COOKIES_SECRET,
  SECRET_SESSION,
  API_BASE_PATH,
} = require("./config/constant");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const app = express();

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ==> ${HOST}:${PORT}`);
  displayRoutes(app);
});

// Middlewares

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/../public"));
app.use(errorHandler);
app.use(cookieParser(process.env.COOKIES_SECRET));

// Configuración de la sesión
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.URI_ATLAS,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: process.env.SECRET_SESSION,
    saveUninitialized: true,
    resave: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "handlebars");

// Rutas
app.use("/", handlebarsRoutes);
app.use(`${API_BASE_PATH}/products`, productsRoutes);
app.use(`${API_BASE_PATH}/carts`, cartsRoutes);
app.use(`${API_BASE_PATH}/message`, messageRoutes);
app.use(`${API_BASE_PATH}/`, cookieRoutes);
app.use(`${API_BASE_PATH}/session`, sessionRoutes);

// Conexión a MongoDB
const connection = mongoose
  .connect(process.env.URI_ATLAS)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });
