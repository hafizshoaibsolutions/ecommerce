import React, { memo } from "react";
import CheckboxComponent from "@/components/Checkbox";

const InventoryForm = memo(({ product, dispatchProduct }) => (
  <div className="rounded-2xl py-2 mt-4 bg-white border border-[#E4E7EC]">
    <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">
      Inventory & Shipping
    </h1>
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold">Add Product Inventory & Shipping Details</h2>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">SKU</label>
              <input
                type="text"
                value={product?.sku}
                onChange={(e) => dispatchProduct({ type: "SET_SKU", payload: e.target.value })}
                className="w-full rounded-lg border p-2.5"
                placeholder="SKU Code"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Barcode</label>
              <input
                type="text"
                value={product?.barcode}
                onChange={(e) => dispatchProduct({ type: "SET_BARCODE", payload: e.target.value })}
                className="w-full rounded-lg border p-2.5"
                placeholder="Barcode"
              />
            </div>
            <div className="w-full">
              <CheckboxComponent
                label="Track quantity"
                checked={!!product?.trackQuantity}
                onChange={(val) => dispatchProduct({ type: "SET_TRACK_QUANTITY", payload: !!val })}
              />
            </div>
          </div>

          <div className="w-full">
            <CheckboxComponent
              label="Continue selling when out of stock"
              checked={!!product?.continueSellingWhenOutOfStock}
              onChange={(val) => dispatchProduct({ type: "SET_CONTINUE_SELLING_WHEN_OUT_OF_STOCK", payload: !!val })}
            />
          </div>

          {product.trackQuantity && (
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={product?.quantity}
                onChange={(e) =>
                  dispatchProduct({
                    type: "SET_QUANTITY",
                    payload: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              className="w-full rounded-lg border p-2.5"
              placeholder="0"
            />
          </div>)}

          <div className="border-b border-[#E4E7EC]" />

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="sm:col-span-2">
              <CheckboxComponent
                label="This product requires shipping"
                checked={!!product?.isPhysicalProduct}
                onChange={(val) => dispatchProduct({ type: "SET_IS_PHYSICAL_PRODUCT", payload: !!val })}
              />
            </div>

            {product?.isPhysicalProduct && (
              <div>
                <label className="block mb-2 text-sm font-medium">Item Weight (kg)</label>
                <input
                  type="number"
                  value={product.weight ?? ""}
                  onChange={(e) =>
                    updateProduct(
                      "weight",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border p-2.5"
                  placeholder="0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  </div>
));

export default InventoryForm;
