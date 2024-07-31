import mongoose from "mongoose";
import Menus from "../models/Menus.js";

export const getProducts = async (req, res) => {
  try {
    const { menuId } = req.query;

    if (!menuId) {
      return res.status(400).json({ message: "Menu ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ message: "Invalid Menu ID" });
    }

    const menu = await Menus.findById(menuId);

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(200).json(menu);
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

export const getAllProducts = async (_req, res) => {
  try {
    const menus = await Menus.find();

    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "Menus not found" });
    }

    return res.status(200).json(menus);
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
