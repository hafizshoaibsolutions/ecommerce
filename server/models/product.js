
import mongoose from "mongoose";
import slugify from "slugify";


const variantSchema = new mongoose.Schema({
  options: {
    type: Object, // e.g., { color: "Red", size: "M" }
    required: true,
  },
  price: { type: Number, min: 0 },
  sku: String,
  barcode: String,
  quantity: { type: Number, min: 0, default: 0 }, // inventory per variant
  images: [String],
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3 },
    slug: { type: String, unique: true, index: true },
    description: String,
    brand: String,
    images: [String], // main product images
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: Number,
    costPerItem: Number,
    chargeTax: { type: Boolean, default: true },
    sku: String,
    barcode: String,
    isPhysicalProduct: { type: Boolean, default: true },
    weight: Number,
    continueSellingWhenOutOfStock: { type: Boolean, default: false },

    // NEW: product-level inventory (for non-variant products)
    quantity: { type: Number, min: 0, default: 0 },

    // Inventory control flag
    trackQuantity: { type: Boolean, default: true },

    // Relationships
    vendor: { type: String, trim: true },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    promotions: [{ type: String, trim: true }],

    productType: { type: String, trim: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],


    variants: [variantSchema],
    tags: [String],

    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "active",
    },
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
);





// Pre-save hook: generate slug from title
productSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness
    while (await mongoose.models.Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

// Virtual property to check stock status
productSchema.virtual("inStock").get(function () {
  if (this.variants.length > 0) {
    return this.variants.some((variant) => variant.quantity > 0);
  }
  return this.quantity > 0;
});

const Product = mongoose.model("Product", productSchema);

export default Product;



   //  productType: String,
    // vendor: String,
    // collections: [String],
    // tags: [String],
    // seoTitle: String,
    // seoDescription: String,
    // status: {
    //   type: String,
    //   enum: ["draft", "active", "archived"],
    //   default: "draft",
    // },