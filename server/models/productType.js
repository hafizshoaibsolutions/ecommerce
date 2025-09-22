import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("ProductType", productTypeSchema);