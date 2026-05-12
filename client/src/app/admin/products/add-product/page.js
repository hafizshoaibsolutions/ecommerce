'use client';
import React, { useState, useReducer, useRef, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

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
  brand: "",
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
    
    case "SET_BRAND":
      return { ...state, brand: action.payload };
    
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync variants to product reducer whenever they change
  useEffect(() => {
    dispatchProduct({ type: "SET_VARIANTS", payload: variants });
  }, [variants, dispatchProduct]);
 


  const handleImagesChange = useCallback((files) => {
    dispatchProduct({ type: "SET_IMAGES", payload: files });
  }, [dispatchProduct]);

  const handleAddProduct = useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      if (product.images && product.images.length > 0) {
        product.images.forEach((file) => {
          if (file instanceof File) formData.append(`images`, file)
        })
      }

      // append scalar fields
      const scalarFields = [
        "title",
        "description",
        "price",
        "compareAtPrice",
        "costPerItem",
        "brand",
        "sku",
        "quantity",
        "barcode",
        "weight",
        "chargeTax",
        "productType",
        "trackQuantity",
        "continueSellingWhenOutOfStock",
        "isPhysicalProduct",
        "vendor",
        "status",
        "metaTitle",
        "metaDescription",
      ]

      scalarFields.forEach((key) => {
        if (product[key] !== undefined && product[key] !== null) {
          formData.append(key, String(product[key]))
        }
      })

      // append array/object fields as JSON
      formData.append("collections", JSON.stringify(product.collections || []))
      formData.append("promotions", JSON.stringify(product.promotions || []))
      formData.append("tags", JSON.stringify(product.tags || []))
      // Extract only _id from category objects
      const categoryIds = (product.categories || []).map(cat => typeof cat === 'object' ? cat._id : cat)
      formData.append("categories", JSON.stringify(categoryIds))

      // format and append variants with options stored as array
      const formattedVariants = variants.map((v) => {
        const { price, sku, barcode, quantity } = v || {}
        
        // Extract options from variant object (all keys except price, sku, barcode, quantity)
        const variantOptions = Object.keys(v)
          .filter((key) => !["price", "sku", "barcode", "quantity"].includes(key))
          .map((key) => ({
            name: key,
            value: v[key]
          }))
        
        return { 
          price, 
          sku, 
          barcode, 
          quantity, 
          options: variantOptions,
          images: [] 
        }
      })
      formData.append("variants", JSON.stringify(formattedVariants))

      

      const result = dispatch(addProducts(formData))
      if (result instanceof Promise) await result

      // reset local state
      dispatchProduct({ type: "RESET_FORM" })
      // clear file UI via ref if available
      if (parentRef.current && typeof parentRef.current.clearImages === "function") {
        parentRef.current.clearImages()
      }
      setVariants([])
      setOptions([])
    } catch (err) {
      console.error("Failed to add product", err)
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, product, variants, dispatch, setOptions])


  

  return (
    <div>
      {/* Header & Breadcrumbs */}
      <div className="flex items-center justify-between gap-2 px-2 py-3 border-gray-700 ">
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
         <BasicInfoForm ref={parentRef} product={product} dispatchProduct={dispatchProduct}  onImagesChange={handleImagesChange}  />
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
