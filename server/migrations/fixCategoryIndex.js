import mongoose from "mongoose";
import Category from "../models/productCategory.js";

/**
 * Migration: Drop old slug unique index and ensure compound index exists
 * Run this once with: node migrations/fixCategoryIndex.js
 */

async function fixCategoryIndex() {
  try {
    // Get the collection
    const collection = Category.collection;

    console.log("Checking existing indexes...");
    const indexes = await collection.getIndexes();
    console.log("Current indexes:", Object.keys(indexes));

    // Drop the old slug_1 unique index if it exists
    if (indexes.slug_1) {
      console.log("Dropping old slug_1 index...");
      await collection.dropIndex("slug_1");
      console.log("✅ Old slug_1 index dropped");
    }

    // Ensure the compound unique index exists
    console.log("Creating compound index on (parent, slug)...");
    await collection.createIndex({ parent: 1, slug: 1 }, { unique: true, sparse: true });
    console.log("✅ Compound index created");

    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

// Connect to MongoDB and run migration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommercesite")
  .then(() => {
    console.log("Connected to MongoDB");
    return fixCategoryIndex();
  })
  .catch(error => {
    console.error("Connection failed:", error.message);
    process.exit(1);
  });
