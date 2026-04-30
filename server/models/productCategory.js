
// models/Category.js
import e from "express";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null, index: true }, // Add index for fast queries
    images: [String], // optional: category images
  },
  { timestamps: true }
);

const Category =  mongoose.model("Category", categorySchema);

export default Category;