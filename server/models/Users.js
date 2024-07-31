import mongoose from "mongoose";

const usersDataSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: { type: String, trim: true, default: null },
    companyName: { type: String, trim: true, default: null },
    jobTitle: { type: String, trim: true, default: null },
    industry: { type: String, trim: true, default: null },
    experienceLevel: { type: String, trim: true, default: null },
    contactNumber: { type: String, trim: true, default: null },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersDataSchema, "Users");

export default Users;
