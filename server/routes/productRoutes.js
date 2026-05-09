const express = require('express');
const productRouter = express.Router();
const { createProduct, getAllProducts ,getProductById, deleteProduct, getDiscountBannerProduct, getFilterOptions, getProductTypes}  = require('../controllers/productController.js');
const upload = require('../middlewares/upload');
const { authVerifyMiddleware } = require('../middlewares/auth.js');

productRouter.post("/add-product",upload.array("images", 5), createProduct);
productRouter.get("/get-product", getAllProducts);
productRouter.get("/get-product/:id", getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/get-discount-banner-product", getDiscountBannerProduct);
productRouter.get("/filter-options", getFilterOptions);
productRouter.get("/product-types", getProductTypes);

module.exports = productRouter;
