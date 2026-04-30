import React from "react";
import { useSelector } from "react-redux";
import CategoryRows from "./CategoryRows";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchCategoriesTree } from "../store/slices/categorySlice";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCategoryRows = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="border-b border-gray-200">
          <td className="py-2">
            <Skeleton className="h-4 w-32 animate-pulse" />
          </td>
          <td className="text-center">
            <Skeleton className="h-4 w-20 mx-auto animate-pulse" />
          </td>
          <td className="text-center">
            <Skeleton className="h-4 w-10 mx-auto animate-pulse" />
          </td>
          <td className="text-center">
            <div className="flex justify-center gap-2">
              <Skeleton className="h-8 w-8 animate-pulse rounded-md" />
              <Skeleton className="h-8 w-8 animate-pulse rounded-md" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};


const CategoryTable = () => {

  const dispatch = useDispatch();

  const {categoriesTree:categories,loading} = useSelector((state) => state.categories);
  console.log(categories,"categories in category list");
  
  
  useEffect(() => {
    dispatch(fetchCategoriesTree());
  }, [dispatch]);

  



  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Categories List</h2>
        {loading ? (
          <Skeleton className="h-9 w-48 animate-pulse" />
        ) : (
          <input
            type="text"
            placeholder="Search categories..."
            className="border rounded-lg px-3 py-2 text-sm"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-t border-gray-200">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="py-2 ">Category</th>
              <th className="text-center">Slug</th>
              <th className="text-center">Products</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <SkeletonCategoryRows /> : <CategoryRows categories={categories} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;

