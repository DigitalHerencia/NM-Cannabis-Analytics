import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

const subCategorySchema = new mongoose.Schema(
  {
    categories: [categorySchema],
    menuParentId: { type: Number, required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    zip_code: { type: String, required: true },
    address: { type: String, required: true },
    reviews_count: { type: Number, required: true },
    rating: { type: Number, required: true },
    ranking: { type: Number, required: true },
    city: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    dispensary_id: { type: Number, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const marketShareSchema = new mongoose.Schema(
  {
    Licensee: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    Zip: { type: Number, required: true },
    totalMedicalSales: { type: Number, required: true },
    totalAdultUseSales: { type: Number, required: true },
    totalSales: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    marketShare: { type: Number, required: true },
    categories: [subCategorySchema],
  },
  { _id: false }
);

const breakdownDataSchema = new mongoose.Schema({
  City: { type: String, required: true },
  month_year: { type: String, required: true },
  totalMedicalSales: { type: Number, required: true },
  totalAdultUseSales: { type: Number, required: true },
  totalSales: { type: Number, required: true },
  totalMedicalTickets: { type: Number, required: true },
  totalAdultTickets: { type: Number, required: true },
  totalTickets: { type: Number, required: true },
  marketshare: [marketShareSchema],
});

const Breakdown = mongoose.model("Breakdown", breakdownDataSchema, "Breakdown");

export default Breakdown;
