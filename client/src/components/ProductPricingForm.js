import React, { memo } from "react";
import CheckboxComponent from "@/components/Checkbox";

const PricingForm = memo(({ product, dispatchProduct }) => (
<div className="rounded-2xl py-2 mt-4 bg-white border-1 border-[#E4E7EC]">
  {/* Section Heading */}
  <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">
    Pricing
  </h1>

  <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add Product Pricing
      </h2>

      <form action="#">
        <div className="flex flex-col gap-6 sm:gap-10">
          {/* Price & Compare at Price */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
            {/* Price */}
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product?.price}
                onChange={(e) => dispatchProduct({ type: "SET_PRICE", payload: e.target.value })}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>

            {/* Compare At Price */}
            <div className="w-full">
              <label
                htmlFor="compareAtPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Compare at price
              </label>
              <input
                type="number"
                name="compareAtPrice"
                id="compareAtPrice"
                value={product?.compareAtPrice}
                onChange={(e) => dispatchProduct({ type: "SET_COMPARE_AT_PRICE", payload: e.target.value })}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>

            {/* Charge Tax */}
            <div className="w-full">
              <CheckboxComponent
                label="Charge tax"
                checked={product?.chargeTax}
                onChange={(val) => dispatchProduct({ type: "SET_CHARGE_TAX", payload: val })}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-[#E4E7EC]" />

          {/* Cost per item */}
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-8">
            <div className="w-full">
              <label
                htmlFor="costPerItem"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cost per item
              </label>
              <input
                type="number"
                name="costPerItem"
                id="costPerItem"
                value={product?.costPerItem}
                onChange={(e) => dispatchProduct({ type: "SET_COST_PER_ITEM", payload: e.target.value })}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>
          </div>

          {/* Profit & Margin Display */}
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-8">
            <div className="w-full flex gap-8 items-center">
              {/* Profit */}
              <label className="mb-2 text-md font-bold text-gray-900 dark:text-white">
                Profit:
              </label>
              <div className="text-sm font-bold text-gray-700 bg-gray-200 py-2 px-4">
                2323
              </div>

              {/* Margin */}
              <label className="mb-2 text-md font-bold text-gray-900 dark:text-white">
                Margin:
              </label>
              <div className="text-sm font-bold text-gray-700 bg-gray-200 py-2 px-4">
                2323%
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</div>

));

export default PricingForm;
