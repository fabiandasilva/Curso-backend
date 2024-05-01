import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from 'url';
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Server } from 'socket.io';
import expressRoutemap from "express-routemap";

import * as config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import viewRoutes from "./routes/views.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";
import mockingProducts from "./routes/faker.products.routes.js"
import smsRoutes from "./routes/sms.routes.js";

// Constants
const { PORT, HOST, API_PREFIX, COOKIE_SECRET } = config;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(COOKIE_SECRET));
app.use(passport.initialize());

// Set view engine
app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Routes
app.use(`/${API_PREFIX}/products`, productsRoutes);
app.use(`/${API_PREFIX}/carts`, cartsRoutes);
app.use(`/${API_PREFIX}/messages`, messagesRoutes);
app.use(`/${API_PREFIX}/sessions`, sessionRoutes);
app.use(`/${API_PREFIX}/mockingproducts`, mockingProducts);
app.use(`/${API_PREFIX}/sms`, smsRoutes);
app.use('/', viewRoutes);

// Start server
const server = app.listen(PORT, () => {
    expressRoutemap(app);
    console.log(`Servidor corriendo en ==> ${HOST}:${PORT}`);
});

// Initialize socket.io
const io = new Server(server);
app.set("io",  io);

// Initialize Passport
initializePassport()
app.use(passport.initialize())