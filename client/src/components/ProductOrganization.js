import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import TagInput from "./TagInput";
import Checkbox from "@/components/Checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

function ProductOrganization({ product, dispatchProduct }) {
  console.log("ProductOrganization render");

  const OPTIONS = [
    { value: "HR", label: "HR" },
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
  ];
  return (
    <div className="rounded-2xl py-2 mt-4 bg-white border-1 border-[#E4E7EC]">
      <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">
        Organization
      </h1>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto mx-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="product type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product type
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product?.productType}
                  onChange={(e) => dispatchProduct({ type: "SET_PRODUCT_TYPE", payload: e.target.value })}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="vendor"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vendor
                </label>
                <select
                  id="vendor"
                  value={product?.vendor}
                  onChange={(e) => dispatchProduct({ type: "SET_VENDOR", payload: e.target.value })}
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Select vendor</option>
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Sony">Sony</option>
                  <option value="Apple">Apple</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Categories"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Categories
                </label>

                <MultiSelectDropdown
                  label="Categories"
                  selected={product?.categories}
                  onChange={(categories) => dispatchProduct({ type: "SET_CATEGORIES", payload: categories })}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Promotions"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Promotions
                </label>

                <MultiSelectDropdown
                  label="Promotions"
                  selected={product?.promotions}
                  onChange={(promotions) =>
                    dispatchProduct({ type: "SET_PROMOTIONS", payload: promotions })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Collection"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Collections
                </label>

                <MultiSelectDropdown
                  label="Collections"
                  selected={product?.collections}
                  onChange={(collections) =>
                    dispatchProduct({ type: "SET_COLLECTIONS", payload: collections })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </label>
                <TagInput tags={product?.tags} dispatchProduct={dispatchProduct} />
              </div>

              <div className="sm:col-span-2 flex gap-5 items-center">
                <Label className="">Status :</Label>

                <RadioGroup
                  value={product?.status}
                  onValueChange={(value) => dispatchProduct({ type: "SET_STATUS", payload: value })}
                  className="flex"
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
