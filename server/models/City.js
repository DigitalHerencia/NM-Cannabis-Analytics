import mongoose from "mongoose";

const cityDataSchema = new mongoose.Schema({
  City: { Type: String },
  month_year: { Type: String },
  totalMedicalSales: { Type: Number },
  totalAdultUseSales: { Type: Number },
  totalSales: { Type: Number },
  totalMedicalTickets: { Type: Number },
  totalAdultTickets: { Type: Number },
  totalTickets: { Type: Number },
});

const City = mongoose.model("City", cityDataSchema, "City");

export default City;
