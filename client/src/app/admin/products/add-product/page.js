'use client';
import React, { useState, useCallback, useReducer,useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

import CheckboxComponent from "@/components/Checkbox";
import VariantForm from "@/components/ProductVariantForm";
import { Button } from "@/components/ui/button";
import BasicInfoForm from "@/components/ProductBasicInfoForm";
import PricingForm from "@/components/ProductPricingForm";
import InventoryForm from "@/components/ProductInventoryForm";
import { addProducts } from "@/store/slices/productSlice";
import ProductOrganization from "@/components/ProductOrganization";



const initialProduct = {
  title: "",
  description: "",
  images: [], // array of URLs
  price: 0,
  compareAtPrice: 0,
  costPerItem: 0,
  sku: "",
  barcode: "",
  weight: 0,
  chargeTax: false,
  trackQuantity: true, // matches schema
  continueSellingWhenOutOfStock: false,
  isPhysicalProduct: false, // matches schema default
  vendor: "", // will hold vendor _id
  collections: [], // will hold array of collection _id
  promotions: [], // will hold array of promotion _id
  tags: [],
  productType: "",  // holds one productType _id
  categories: [],   // holds multiple category _ids
  status: "active",
  metaTitle: "",
  metaDescription: "",
  quantity: 0, // product-level quantity
  variants: [], // array of variant objects
}

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    
    case "SET_IMAGES":
      return { ...state, images: action.payload };
    
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_COMPARE_AT_PRICE":
      return { ...state, compareAtPrice: action.payload };

    case "SET_COST_PER_ITEM":
      return { ...state, costPerItem: action.payload };
    case "SET_SKU":
      return { ...state, sku: action.payload };
    case "SET_BARCODE":
      return { ...state, barcode: action.payload };
    case "SET_WEIGHT":
      return { ...state, weight: action.payload };
    case "SET_CHARGE_TAX":
      return { ...state, chargeTax: action.payload };
    case "SET_TRACK_QUANTITY":
      return { ...state, trackQuantity: action.payload };
    case "SET_CONTINUE_SELLING_WHEN_OUT_OF_STOCK":
      return { ...state, continueSellingWhenOutOfStock: action.payload };
    case "SET_IS_PHYSICAL_PRODUCT":
      return { ...state, isPhysicalProduct: action.payload };
    case "SET_VENDOR":
      return { ...state, vendor: action.payload };
    case "SET_COLLECTIONS":
      return { ...state, collections: action.payload };
    case "SET_PROMOTIONS":
      return { ...state, promotions: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_META_TITLE":
      return { ...state, metaTitle: action.payload };
    case "SET_META_DESCRIPTION":
      return { ...state, metaDescription: action.payload };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    case "SET_VARIANTS":
      return { ...state, variants: action.payload };
    case "RESET_FORM":
      return initialProduct;
    default:
      return state;
  }
}



function AddProductPage() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., "/admin/products"
  const path = pathname.split("/").filter((item) => item !== "");
  const title = path[path.length - 1];
  const dispatch = useDispatch();
  const [product, dispatchProduct] = useReducer(productReducer, initialProduct);

  const parentRef = useRef(null);

  
  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);

  
 


  // const handleImageChange = (files) => {
  //   dispatchProduct({ type: "SET_IMAGES", payload: files });
  //   console.log(files,'files in add product page')
  // }

  const handleAddProduct = async () => {
  // 1️⃣ Create FormData
  const formData = new FormData();
  

  if (product.images && product.images.length > 0) {
        product.images.forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })
      }

  // 2️⃣ Append text fields
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("compareAtPrice", String(product.compareAtPrice));
  formData.append("costPerItem", String(product.costPerItem));
  formData.append("sku", product.sku);
  formData.append("barcode", product.barcode);
  formData.append("weight", String(product.weight));
  formData.append("chargeTax", String(product.chargeTax));
  formData.append("trackQuantity", String(product.trackQuantity));
  formData.append("continueSellingWhenOutOfStock", String(product.continueSellingWhenOutOfStock));
  formData.append("isPhysicalProduct", String(product.isPhysicalProduct));
  formData.append("vendor", product.vendor);
  formData.append("status", product.status);
  formData.append("metaTitle", product.metaTitle);
  formData.append("metaDescription", product.metaDescription);

  // 3️⃣ Append arrays/objects as JSON strings
  formData.append("collections", JSON.stringify(product.collections));
  formData.append("promotions", JSON.stringify(product.promotions));
  formData.append("tags", JSON.stringify(product.tags));
  formData.append("categories", JSON.stringify(product.categories));

  // Format and append variants
  const formattedVariants = variants.map(({ price, sku, barcode, quantity, images, ...options }) => ({
    options,
    price,
    sku,
    barcode,
    quantity,
    images: [],
  }));
  formData.append("variants", JSON.stringify(formattedVariants));

  console.log(" submitting form with data",{
    title: product.title,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice,


  })

  

  console.log(formData,"Form data")

  // 5️⃣ Dispatch Redux thunk
  dispatch(addProducts(formData));

  // 6️⃣ Reset local state if needed
  dispatchProduct({ type: "RESET_FORM" });
   setTimeout(() => {
          console.log("[v0] Clearing images from UI...")
          parentRef.current?.clearImages()
    }, 50)
  setVariants([]);
  setOptions([]);
};

console.log(product,'product in add product page')
  

  return (
    <div>
      {/* Header & Breadcrumbs */}
      <div className="flex items-center justify-between gap-2 px-2 py-3 border-gray-700 pt-20 sm:pt-16">
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <div className="flex items-center gap-2">
          {path.map((item, index) => {
            const fullPath = "/" + path.slice(0, index + 1).join("/");
            const isActive = fullPath === pathname;

            return (
              <div key={index} className="flex items-center gap-2">
                <p
                  className={`text-sm cursor-pointer hover:text-gray-300 ${
                    isActive ? "text-black" : "text-gray-500"
                  }`}
                  onClick={() => router.push(fullPath)}
                >
                  {item}
                </p>
                {index !== path.length - 1 && (
                  <p className="text-sm text-gray-500">{">"}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex p-2 justify-between items-center">
        <h1 className="text-2xl font-bold">Create Product</h1>
        <Button variant="outline">Add Product</Button>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 pt-4">
       <div className="col-span-2"> 
         <BasicInfoForm product={product} dispatchProduct={dispatchProduct} ref = {parentRef}  />
       </div>
       <div className="col-span-2 sm:col-span-1">
         <ProductOrganization product={product} dispatchProduct={dispatchProduct}  />
       </div>
       
      </div>
      <PricingForm product={product} dispatchProduct={dispatchProduct} />
      <InventoryForm product={product} dispatchProduct={dispatchProduct} />
      <VariantForm
        options={options}
        setOptions={setOptions}
        variants={variants}
        setVariants={setVariants}
      />
      
      

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/admin/products")} className=" sm:w-auto cursor-pointer">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} className=" sm:w-auto bg-blue-600 hover:bg-blue-500 cursor-pointer text-white">
          Save Product
        </Button>
      </div>
    </div>
  );
}

export default AddProductPage;
