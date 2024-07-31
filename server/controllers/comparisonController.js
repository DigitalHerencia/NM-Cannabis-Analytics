import mongoose from "mongoose";
import Comparison from "../models/Comparison.js";

export const getComparisons = async (_req, res) => {
  try {
    const comparisons = await Comparison.find();

    if (!comparisons || comparisons.length === 0) {
      return res.status(404).json({ message: "No comparisons found" });
    }

    return res.status(200).json(comparisons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: { name: error.name, message: error.message, stack: error.stack },
    });
  }
};

export const getComparisonById = async (req, res) => {
  try {
    const { menuId } = req.query;

    if (!menuId) {
      return res.status(400).json({ message: "Menu ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ message: "Invalid comparison ID" });
    }

    const comparison = await Comparison.find({ "product._id": menuId });
    if (!comparison) {
      return res.status(404).json({ message: "Comparison not found" });
    }

    return res.status(200).json(comparison);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};
