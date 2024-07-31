import express from "express";
import { getAllProducts, getProducts } from "../controllers/menusController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/all-products", getAllProducts);

export default router;
