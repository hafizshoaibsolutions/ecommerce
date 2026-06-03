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
  console.log("Raw variants from req.body:", req?.body?.variants);


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
      brand,
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
    let collections, promotions, tags, categories, variants;
    
    try {
      collections = parseJSON(req.body.collections);
      promotions = parseJSON(req.body.promotions);
      tags = parseJSON(req.body.tags);
      categories = parseJSON(req.body.categories);
      variants = parseJSON(req.body.variants);
    } catch (parseErr) {
      console.error("❌ Error parsing JSON fields:", parseErr);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid JSON in collections, promotions, tags, categories, or variants",
        error: parseErr.message 
      });
    }

    console.log("Parsed collections:", variants?.options);

    console.log({
      title,
      description,
      price,
      compareAtPrice,
      costPerItem,
      chargeTax,
      brand,
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
      collections,
      promotions,
      tags,
      categories,
      variants,
      imgUrls
    }, "Parsed product data in controller")

    // 🛠 Basic validation
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ success: false, message: "Valid price is required." });
    }

    // 🆕 Create product document
    const product = new Product({
      title: title.trim(),
      slug: slugify(title.trim(), { lower: true }),
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
      brand,
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

    res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    console.error("❌ Full error:", err);
    
    // Check if it's a validation error
    if (err.name === 'ValidationError') {
      const validationErrors = Object.keys(err.errors).map(key => 
        `${key}: ${err.errors[key].message}`
      );
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message,
      details: err.errors || null
    });
  }
  }






const getAllProducts = async (req, res) => {
  console.log("Query parameters:", req.query);
  console.log("Headers:", req.headers);
  try {
    const { search, category, minPrice, maxPrice, brands, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    let query = { status: "active" };

    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.categories = category;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Handle multiple brands filter
    if (brands) {
      const brandList = brands.split(',').map(b => b.trim()).filter(b => b);
      if (brandList.length > 0) {
        query.vendor = { $in: brandList };
      }
    }

    // Build sort object from query parameter
    const sortObj = {};
    if (sort) {
      const sortParam = sort.startsWith('-') ? sort.substring(1) : sort;
      sortObj[sortParam] = sort.startsWith('-') ? -1 : 1;
    }

    const products = await Product.find(query)
      .populate('categories')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortObj || { createdAt: -1 });

    const total = await Product.countDocuments(query);

    console.log(products,"products in getAllProducts controller")

    res.status(200).json({ success: true, products, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
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
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;
   console.log(id,"id from req")
    try {
        const product = await Product.findById(id);
        console.log(product,"product")
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product fetched", product });
    } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product", error });
    }

};


const getDiscountBannerProduct = async (req, res) => {

  try {

      const discountedProducts = await Product.find(
         {
          $expr: {
            $gt: ["$compareAtPrice", "$price"]
          }
         }
        )

        const promoProduct = discountedProducts.sort((a, b) => {
          const discountA = a.compareAtPrice - a.price;
          const discountB = b.compareAtPrice - b.price;
          return discountB - discountA; // Sort in descending order of discount
        })[0]; // Get the product with the highest discount
      res.status(200).json({ success: true, discountedProducts, promoProduct });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching discounted products", error });
  }

}


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

// Get available filter options for sidebar (brands, variant keys, price range)
const getFilterOptions = async (req, res) => {
    try {
        const { category } = req.query;
        let matchStage = { $match: { status: "active" } };
        
        if (category) {
            matchStage.$match.categories = category;
        }

        // Aggregation pipeline to extract unique brands, variant options, and price range
        const filters = await Product.aggregate([
            matchStage,
            {
                $facet: {
                    brands: [
                        { $match: { vendor: { $exists: true, $ne: null, $ne: "" } } },
                        { $group: { _id: "$vendor" } },
                        { $sort: { _id: 1 } }
                    ],
                    variantKeys: [
                        { $unwind: "$variants" },
                        { $unwind: { path: "$variants.options", preserveNullAndEmptyArrays: false } },
                        { 
                            $group: { 
                                _id: null,
                                keys: { $addToSet: { $objectToArray: "$variants.options" } }
                            } 
                        },
                        { 
                            $project: { 
                                keys: {
                                    $reduce: {
                                        input: "$keys",
                                        initialValue: [],
                                        in: { $concatArrays: ["$$value", "$$this"] }
                                    }
                                }
                            }
                        },
                        { 
                            $project: { 
                                uniqueKeys: {
                                    $reduce: {
                                        input: "$keys",
                                        initialValue: [],
                                        in: {
                                            $cond: [
                                                { $in: ["$$this.k", "$$value"] },
                                                "$$value",
                                                { $concatArrays: ["$$value", ["$$this.k"]] }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    priceRange: [
                        { $group: { _id: null, minPrice: { $min: "$price" }, maxPrice: { $max: "$price" } } }
                    ]
                }
            }
        ]);

        const result = filters[0];
        
        // Extract variant options for each key
        const variantOptions = {};
        if (result.variantKeys.length > 0 && result.variantKeys[0].uniqueKeys) {
            for (const key of result.variantKeys[0].uniqueKeys) {
                const options = await Product.aggregate([
                    matchStage,
                    { $unwind: "$variants" },
                    { $unwind: "$variants.options" },
                    { 
                        $group: { 
                            _id: `$variants.options.${key}`,
                            count: { $sum: 1 }
                        } 
                    },
                    { $sort: { _id: 1 } }
                ]);
                variantOptions[key] = options.map(opt => ({ value: opt._id, count: opt.count }));
            }
        }

        const brands = result.brands.map(b => b._id).filter(b => b);
        const priceRange = result.priceRange.length > 0 
            ? result.priceRange[0]
            : { minPrice: 0, maxPrice: 0 };

        res.status(200).json({ 
            success: true, 
            brands, 
            variantOptions,
            priceRange,
            variantKeys: result.variantKeys.length > 0 ? result.variantKeys[0].uniqueKeys : []
        });

    } catch (error) {
        console.error("Error fetching filter options:", error);
        res.status(500).json({ success: false, message: "Error fetching filter options", error: error.message });
    }
};

// Get all product types
const getProductTypes = async (req, res) => {
    try {
        const ProductType = require('../models/productType').default || require('../models/productType');
        const productTypes = await ProductType.find().sort({ name: 1 });
        
        res.status(200).json({ 
            success: true, 
            productTypes,
            message: "Product types fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching product types:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching product types", 
            error: error.message 
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    getDiscountBannerProduct,
    getFilterOptions,
    getProductTypes
}
