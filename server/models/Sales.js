import mongoose from "mongoose";

const monthlyDataSchema = new mongoose.Schema(
  {
    month: { type: String },
    year: { type: Number },
    totalSales: { type: Number },
    medicalSales: { type: Number },
    adultuseSales: { type: Number },
  },
  { _id: false }
);

const salesDataSchema = new mongoose.Schema({
  Licensee: { type: String },
  Address: { type: String },
  City: { type: String },
  State: { type: String },
  Zip: { type: Number },
  monthlyData: [monthlyDataSchema],
});

const Sales = mongoose.model("Sales", salesDataSchema, "Sales");

export default Sales;
