const { default: mongoose } = require("mongoose");
const CategoryModule = require("../models/productCategory");
const Category = CategoryModule.default || CategoryModule;
const slugify = require("slugify");


// ➤ Create Category
 const createCategory = async (req, res) => {

  console.log("Received request to create category with body:", req.body);
  console.log("Received files:", req.files);
  try {
    let { name, parent } = req?.body;
    const imageUrls = req?.files?.map(file => file?.path);

    // Auto slug generation
    const slug = slugify(name,{ lower:true})

    // Normalize parent: convert empty string to null
    parent = parent && parent.trim() ? new mongoose.Types.ObjectId(parent) : null;

    console.log("🔍 Creating category:", { name, slug, parent });

    // Check if category with this slug already exists under the same parent
    const query = { slug, parent };
    console.log("🔍 Checking for duplicates with query:", query);
    
    const existingCategory = await Category.findOne(query);
    console.log("🔍 Query result:", existingCategory);
    
    if (existingCategory) {
      console.log("❌ Duplicate found:", existingCategory);
      return res.status(400).json({ 
        success: false, 
        message: `A category with the name "${name}" already exists in this location. Please use a different name.` 
      });
    }

    const category = new Category({ name, slug, parent, images: imageUrls });
    const savedCategory = await category.save();
    console.log("✅ Category saved:", savedCategory);

    res.status(201).json({ success: true, message: "Category created successfully", category: savedCategory });
  } catch (error) {
    console.error("❌ Error:", error.message);
    // Handle MongoDB duplicate key error (compound index)
    if (error.code === 11000) {
      console.error("❌ E11000 duplicate key error:", error.keyPattern);
      return res.status(400).json({ 
        success: false, 
        message: `A category with this name already exists in this location. Please use a different name.` 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all categories
 const getAllCategories = async (req, res) => {
  try {
   
    const categories = await Category.find().lean();
    console.log(categories,"categories in getAllCategories controller")
    res.status(200).json({ success: true, message: "Categories fetched successfully", categories: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function buildCategoryTree(parent = null) {
    const categories = await Category.find({ parent }).lean();
    const tree = [];
    for (let category of categories) {
        const children = await buildCategoryTree(category._id);
        tree.push({ ...category, children });
    }
    return tree;
}

const getCategoryTree = async (req, res) => {
    try {
        const tree = await buildCategoryTree();
    res.status(200).json({ success: true, message: "Category tree fetched successfully", tree });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ➤ Delete Category
 const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryTree,
};