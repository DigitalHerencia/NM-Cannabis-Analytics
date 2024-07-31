import City from "../models/City.js";

export const getPerformance = async (_req, res) => {
  try {
    const performance = await City.find();

    if (!performance || performance.length === 0) {
      return res.status(404).json({
        message: "Performance data not found",
      });
    }

    return res.status(200).json(performance);
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
