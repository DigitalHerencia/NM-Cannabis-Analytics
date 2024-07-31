import express from "express";
import {
  getBreakdown,
  getProductCategories,
} from "../controllers/breakdownController.js";

const router = express.Router();

// Get breakdown data
router.get("/breakdown", getBreakdown);
router.get("/product-categories", getProductCategories);

export default router;
