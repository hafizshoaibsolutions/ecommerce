const ProductModule = require('../models/product');
const Product = ProductModule.default || ProductModule;
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinary');
const slugify = require('slugify');



// Helper to parse JSON fields safely
const parseJSON = (field, fallback = []) => {
  try {
    return field ? JSON.parse(field) : fallback;
  } catch {
    return fallback; // Return fallback if parsing fails
  }
};

const createProduct = async (req, res) => {


  console.log("Request body:", req?.body);
  console.log("Uploaded files (req.files):", req?.files);
 


  try {
    // 🖼 Handle image uploads
    const imgUrls = [];

    // When using multer-storage-cloudinary, multer already uploads files to Cloudinary
    // and each file will include a `path` or `filename`/`path` depending on configuration.
    // If req.files is present, prefer the URL provided by the storage engine.
    if (req.files && req.files.length) {
      for (const file of req.files) {
        // Depending on storage engine, the uploaded file may have `path`, `url`, or `secure_url`.
        // multer-storage-cloudinary typically sets `path` to the Cloudinary URL.
        const fileUrl = file.path || file.url || file.secure_url || file.location
        if (fileUrl) imgUrls.push(fileUrl)
        else if (file.path) {
          // as a fallback, try to upload the file.path (local path) to cloudinary
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "mern-ecommerce",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
          });
          imgUrls.push(uploadResult.secure_url);
        }
      }
    } else {
      console.log("No req.files - the request may not have been sent as multipart/form-data. Make sure the client does NOT force Content-Type and lets the browser set the multipart boundary.")
    }

    // 🧹 Extract and parse product fields
    const {
      title,
      description,
      price,
      compareAtPrice,
      costPerItem,
      chargeTax,
      sku,
      barcode,
      trackQuantity,
      quantity,
      continueSellingWhenOutOfStock,
      isPhysicalProduct,
      vendor,
      status,
      metaTitle,
      metaDescription,
      weight,
      productType,
    } = req.body;

    // Parse arrays/objects that were sent as JSON strings
    const collections = parseJSON(req.body.collections);
    const promotions = parseJSON(req.body.promotions);
    const tags = parseJSON(req.body.tags);
    const categories = parseJSON(req.body.categories);
    const variants = parseJSON(req.body.variants);

    // // 🛠 Basic validation
    // if (!title || !price) {
    //   return res.status(400).json({ message: "Title and price are required." });
    // }

    // 🆕 Create product document
    const product = new Product({
      title,
      slug: slugify(title, { lower: true }),
      description,
      images: imgUrls,
      price,
      compareAtPrice,
      costPerItem,
      chargeTax,
      sku,
      barcode,
      trackQuantity,
      quantity,
      continueSellingWhenOutOfStock,
      isPhysicalProduct,
      vendor,
      collections,
      promotions,
      tags,
      productType,
      categories,
      status,
      metaTitle,
      metaDescription,
      variants,
      weight,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Product created successfully",
      product,
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};






const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PRODUCT
 const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If no product found
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }

};





const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
             
        name,
        category,
        subCategory,
        type,
        price,
        description,
        attributes,
        stock,
        brand,
        isFeatured
 } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            category,
            subCategory,
            type,
            price,
            description,
            attributes,
            stock,
            brand,
            isFeatured
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct
}
