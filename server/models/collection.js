// models/Collection.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String, // collection banner
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // optional
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
