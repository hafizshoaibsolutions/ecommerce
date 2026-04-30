const CategoryModule = require("../models/productCategory");
const Category = CategoryModule.default || CategoryModule;


// ➤ Create Category
 const createCategory = async (req, res) => {
  try {
    const { name, parent } = req?.body;
    const imageUrls = req?.files?.map(file => file?.path);

    // Auto slug generation
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = new Category({ name, slug, parent: parent || null, images: imageUrls });
    await category.save();

    res.status(201).json({ success: true, message: "Category created successfully", category });
  } catch (error) {
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