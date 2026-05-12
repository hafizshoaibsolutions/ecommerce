// src/components/ProductOrganization.js
"use client";
import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import TagInput from "./TagInput";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesTree, fetchCategories } from "@/store/slices/categorySlice";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";

const API_BASE = "http://localhost:5000/api"

function ProductOrganization({ product, dispatchProduct }) {
  const dispatch = useDispatch();
  const { categoriesTree, allCategories, loading } = useSelector(
    (state) => state.categories
  );

  const [productTypes, setProductTypes] = useState([]);
  const [loadingProductTypes, setLoadingProductTypes] = useState(false);

  // Fetch categories on page load
  useEffect(() => {
    dispatch(fetchCategoriesTree());
    dispatch(fetchCategories());
    fetchProductTypes();
  }, [dispatch]);

  const fetchProductTypes = async () => {
    try {
      setLoadingProductTypes(true);
      const response = await axios.get(`${API_BASE}/products/product-types`);
      if (response.data && response.data.productTypes) {
        setProductTypes(response.data.productTypes);
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    } finally {
      setLoadingProductTypes(false);
    }
  };

  const categories =
    categoriesTree.length > 0 ? categoriesTree : allCategories || [];

  return (
    <div className="rounded-2xl py-2 mt-4 bg-white border border-[#E4E7EC]">
      <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">
        Organization
      </h1>

      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-10">
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="Type brand name"
                  value={product?.brand || ""}
                  onChange={(e) =>
                    dispatchProduct({
                      type: "SET_BRAND",
                      payload: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />

              </div>

              {/* Vendor */}
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Vendor
                </label>
                <select
                  value={product?.vendor || ""}
                  onChange={(e) =>
                    dispatchProduct({
                      type: "SET_VENDOR",
                      payload: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Select vendor</option>
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Sony">Sony</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Microsoft">Nike</option>
                </select>
              </div>

              {/* Categories */}
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Categories
                </label>
                {loading ? (
                  <Skeleton className="h-9 w-full animate-pulse" />
                ) : (
                  <MultiSelectDropdown
                    label="Categories"
                    categories={categories}
                    selected={product?.categories || []}
                    onChange={(categories) =>
                      dispatchProduct({
                        type: "SET_CATEGORIES",
                        payload: categories,
                      })
                    }
                  />
                )}
              </div>

              {/* Tags */}
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tags
                </label>
                <TagInput
                  tags={product?.tags || []}
                  dispatchProduct={dispatchProduct}
                />
              </div>

              {/* Status */}
              <div className="sm:col-span-2 flex flex-col gap-3">
                <Label>Status</Label>
                <RadioGroup
                  value={product?.status || ""}
                  onValueChange={(value) =>
                    dispatchProduct({ type: "SET_STATUS", payload: value })
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="r1" />
                    <Label htmlFor="r1">Draft</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="r2" />
                    <Label htmlFor="r2">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="archived" id="r3" />
                    <Label htmlFor="r3">Archived</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ProductOrganization;

