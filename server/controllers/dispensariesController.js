import mongoose from "mongoose";
import Dispensaries from "../models/Dispensaries.js";

// Get one dispensary by ID
export const getDispensary = async (req, res) => {
  try {
    const { dispensaryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dispensaryId)) {
      return res.status(400).json({ message: "Invalid dispensary ID" });
    }

    const dispensary = await Dispensaries.findById({
      _id: new mongoose.Types.ObjectId(dispensaryId),
    });

    if (!dispensary) {
      return res.status(404).json({ message: "Dispensary not found" });
    }

    return res.status(200).json(dispensary);
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

// Get all dispensaries
export const getDispensaries = async (_req, res) => {
  try {
    const dispensaries = await Dispensaries.find();

    if (!dispensaries || dispensaries.length === 0) {
      return res.status(404).json({ message: "No dispensaries found" });
    }

    return res.status(200).json(dispensaries);
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

// Get all promotions from all dispensaries
export const getAllPromotions = async (_req, res) => {
  try {
    const promotions = await Dispensaries.aggregate([
      { $unwind: "$top_deals" },
      {
        $project: {
          promoId: "$top_deals.id",
          title: "$top_deals.title",
          slug: "$top_deals.slug",
          rank: "$ranking",
          rating: "$rating",
          source: "$name",
          _id: 0,
          city: "$city",
          address: "$address",
        },
      },
      {
        $sort: {
          rank: -1,
        },
      },
    ]);

    if (!promotions || promotions.length === 0) {
      return res.status(404).json({ message: "No promotions found" });
    }

    return res.status(200).json(promotions);
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
