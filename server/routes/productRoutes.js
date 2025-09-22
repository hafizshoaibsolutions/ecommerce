const express = require('express');
const productRouter = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');
const upload = require('../middlewares/upload');

productRouter.post("/add-product",upload.array("images", 5), createProduct);
productRouter.get("/get-product", getAllProducts);

module.exports = productRouter;
