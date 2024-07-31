import express from "express";
import {
  getAllPromotions,
  getDispensaries,
  getDispensary,
} from "../controllers/dispensariesController.js";

const router = express.Router();

// Get one dispensary by ID
router.get("/dispensary/:id", getDispensary);

// Get all dispensaries
router.get("/dispensaries", getDispensaries);

// Get all promotions from all dispensaries
router.get("/promotions", getAllPromotions);

export default router;
