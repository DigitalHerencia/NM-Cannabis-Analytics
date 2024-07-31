import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the monthly data schema
const monthlyDataSchema = new Schema(
  {
    month: String,
    year: Number,
    totalSales: Number,
    medicalSales: Number,
    adultuseSales: Number,
  },
  { _id: false }
);

// Define the city data schema
const cityDataSchema = new Schema(
  {
    City: String,
    month_year: String,
    totalMedicalSales: Number,
    totalAdultUseSales: Number,
    totalSales: Number,
    totalMedicalTickets: Number,
    totalAdultTickets: Number,
    totalTickets: Number,
    city: String,
    monthYear: String,
  },
  { _id: false }
);

// Define the trending products schema
const trendingProductsSchema = new Schema(
  {
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
    product: {
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
    },
    dispensaries: [
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
    ],
    ranking_average: Number,
    rating_average: Number,
  },
  { _id: false }
);

// Define the sales data schema
const salesDataSchema = new Schema(
  {
    marketTotal: String,
    marketShare: String,
    salesLatestMonth: String,
    salesPreviousMonth: String,
    salesMonthTrend: String,
    salesYtd: String,
    salesYtdPreviousYear: String,
    salesYtdTrend: String,
    averageMonthlySales: String,
    highestMonthSales: String,
    highestMonthSalesDate: String,
    lowestMonthSales: String,
    lowestMonthSalesDate: String,
    totalLifetimeSales: String,
    monthlyData: [monthlyDataSchema],
    cityData: [cityDataSchema],
  },
  { _id: false }
);

// Define the dispensary data schema
const dispensaryDataSchema = new Schema(
  {
    address: String,
    city: String,
    latitude: String,
    longitude: String,
    name: String,
    rank: String,
    rating: String,
    zipCode: String,
  },
  { _id: false }
);

// Define the main KPI schema
const kpiDataSchema = new Schema({
  dispensaryData: dispensaryDataSchema,
  salesData: salesDataSchema,
  productData: {
    menuId: String,
    trendingCount: String,
    trendingProducts: [trendingProductsSchema],
  },
});

const KPI = mongoose.model("KPI", kpiDataSchema, "KPI");

export default KPI;
