import Breakdown from "../models/Breakdown.js";

export const getBreakdown = async (_req, res) => {
  try {
    const breakdown = await Breakdown.find();

    if (!breakdown || breakdown.length === 0) {
      return res.status(404).json({ message: "No breakdown data found" });
    }

    return res.status(200).json(breakdown);
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

export const getProductCategories = async (_req, res) => {
  try {
    const categoriesData = await Breakdown.aggregate([
      {
        $unwind: {
          path: "$marketshare",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$marketshare.categories",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$marketshare.categories.categories",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            name: "$marketshare.categories.name",
            zip_code: "$marketshare.categories.zip_code",
            address: "$marketshare.categories.address",
            rating: "$marketshare.categories.rating",
            ranking: "$marketshare.categories.ranking",
            city: "$marketshare.categories.city",
          },
          categories: {
            $push: {
              category: "$marketshare.categories.categories.category",
              count: "$marketshare.categories.categories.count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          zip_code: "$_id.zip_code",
          address: "$_id.address",
          rating: "$_id.rating",
          ranking: "$_id.ranking",
          city: "$_id.city",
          categories: "$categories",
        },
      },
    ]);

    if (!categoriesData || categoriesData.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(categoriesData);
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
