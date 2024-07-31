import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  tag: {
    type: String,
    id: String,
  },
  menu: {
    id: Number,
    type: String,
  },
  category_name: String,
  parent_category_id: Number,
});

const dispensarySchema = new mongoose.Schema(
  {
    dispensary_id: String,
    dispensary_name: String,
    tag: {
      type: String,
      id: String,
    },
    menu_id: Number,
    dispensary_address: String,
    dispensary_zip_code: String,
    price_unit: Number,
    price_half_gram: Number,
    price_gram: Number,
    price_two_grams: Number,
    price_eighth: Number,
    price_quarter: Number,
    price_half_ounce: Number,
    price_ounce: Number,
    dispensary_latitude: Number,
    dispensary_longitude: Number,
    dispensary_city: String,
    ranking: Number,
    rating: Number,
  },
  { _id: false }
);

const comparisonDataSchema = new mongoose.Schema({
  matches: Number,
  price_average_unit: Number,
  price_average_half_gram: Number,
  price_average_gram: Number,
  price_average_two_grams: Number,
  price_average_eighth: Number,
  price_average_quarter: Number,
  price_average_half_ounce: Number,
  price_average_ounce: Number,
  trend_score: Number,
  trending: Boolean,
  product: [productSchema],
  dispensaries: [dispensarySchema],
  ranking_average: Number,
  rating_average: Number,
});

const Comparison = mongoose.model(
  "Comparison",
  comparisonDataSchema,
  "Comparison"
);
export default Comparison;
