
// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // for nested categories
    image: String, // optional: category image
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

