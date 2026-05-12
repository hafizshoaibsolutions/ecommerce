
// models/Category.js
import e from "express";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true , lowercase:true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // Add index for fast queries
    images: [String], // optional: category images
  },
  { timestamps: true }
);

// Create a compound unique index on parent and slug
// This allows the same slug to exist under different parents (e.g., "men" under "Clothing" and "men" under "Shoes")
// sparse: true allows multiple null values for root categories
categorySchema.index({name:1,parent:1}, {unique:true})
categorySchema.index({ parent: 1, slug: 1 }, { unique: true,});


const Category =  mongoose.model("Category", categorySchema);

export default Category;