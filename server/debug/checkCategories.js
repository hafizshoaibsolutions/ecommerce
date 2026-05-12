import mongoose from "mongoose";
import Category from "../models/productCategory.js";

/**
 * Debug script: Check all categories in database
 * Run with: node debug/checkCategories.js
 */

async function checkCategories() {
  try {
    const categories = await Category.find().lean();
    
    console.log("\n=== ALL CATEGORIES IN DATABASE ===");
    categories.forEach((cat, i) => {
      console.log(`\n${i + 1}. Name: "${cat.name}" | Slug: "${cat.slug}" | Parent: ${cat.parent || "null (ROOT)"}`);
    });

    console.log("\n=== DUPLICATE CHECK ===");
    const slugGroups = {};
    categories.forEach(cat => {
      const key = `${cat.slug}|${cat.parent || "null"}`;
      if (!slugGroups[key]) slugGroups[key] = [];
      slugGroups[key].push(cat.name);
    });

    Object.entries(slugGroups).forEach(([key, names]) => {
      if (names.length > 1) {
        console.log(`⚠️ DUPLICATE: ${key} → [${names.join(", ")}]`);
      }
    });

    console.log("\n=== DATABASE INDEXES ===");
    const indexes = await Category.collection.getIndexes();
    console.log(indexes);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommercesite")
  .then(() => {
    console.log("Connected to MongoDB");
    return checkCategories();
  })
  .catch(error => {
    console.error("Connection failed:", error.message);
    process.exit(1);
  });
