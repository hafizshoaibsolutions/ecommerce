// models/Collection.js
import mongoose, { Collection } from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String, // collection banner
    isFeatured: { type: Boolean, default: false } // optional
  },
  { timestamps: true }
);

const Collection =  mongoose.model("Collection", collectionSchema);
export default Collection;

