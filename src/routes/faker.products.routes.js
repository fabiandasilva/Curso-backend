import { Router } from "express";
import mockingController from "../controllers/faker.products.controller.js";

const mockingProducts = Router();

mockingProducts.get("/", mockingController);

export default mockingProducts;
