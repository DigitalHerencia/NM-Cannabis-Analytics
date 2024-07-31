import express from "express";
import {
  getComparisonById,
  getComparisons,
} from "../controllers/comparisonController.js";

const router = express.Router();

router.get("/comparisons", getComparisons);
router.get("/comparison", getComparisonById);

export default router;
