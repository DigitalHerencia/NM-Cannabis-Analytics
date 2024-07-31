// controllers/salesController.js
import Sales from "../models/Sales.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find();

    if (!sales || sales.length === 0) {
      return res.status(404).json({ message: "Sales not found" });
    }

    return res.status(200).json(sales);
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
