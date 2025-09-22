'use client'
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"

function generateCombination(options) {
  if (!options || options.length === 0) return []
  return options.reduce((acc, option) => {
    if (acc.length === 0) {
      return option.values.map((val) => {
        return {
          [option.name]: val,
          price: "",
          quantity: "",
          sku: "",
        }
      })
    }

    const result = []
    acc.forEach((combo) => {
      option.values.forEach((val) => {
        result.push({
          ...combo,
          [option.name]: val,
          price: "",
          quantity: "",
          sku: "",
        })
      })
    })
    return result
  }, [])
}

export default function VariantForm({ options, setOptions, variants, setVariants }) {
  const [newOptionName, setNewOptionName] = useState("")
  const [newOptionValue, setNewOptionValue] = useState("")

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants]
    if (!updatedVariants[index]) return
    updatedVariants[index] = { ...updatedVariants[index], [field]: value }
    setVariants(updatedVariants)
  }

  const saveVariants = () => {
    console.log("Saving variants:", variants)
  }

  const addOption = () => {
    if (!newOptionName.trim()) return
    setOptions([...options, { name: newOptionName, values: [] }])
    setNewOptionName("")
  }

  const addOptionValue = (index) => {
    if (!newOptionValue.trim()) return
    const updated = [...options]
    updated[index].values = updated[index].values ? [...updated[index].values, newOptionValue] : [newOptionValue]
    setOptions(updated)
    setNewOptionValue("")
  }

  useEffect(() => {
    const newVariants = generateCombination(options)
    setVariants(newVariants)
  }, [options, setVariants])

  return (
    <div className="rounded-2xl py-2 mt-4 bg-white border-1 border-[#E4E7EC]">
      <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">Variants</h1>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-6 text-xl font-bold">Product Variants</h2>
          <div className="p-6 space-y-6 flex-1">
            <Card>
              <CardContent className="space-y-4 p-4">
                <h2 className="font-semibold">Options</h2>
                {options.map((option, index) => {
                  return (
                    <div key={index} className="border p-3 rounded-md space-y-2 ">
                      <p className="font-medium">{option.name} </p>
                      <div className="flex gap-2 flex-wrap">
                        {option?.values?.map((val, i) => {
                          return (
                            <span key={i} className="bg-gray-200 px-2 py-1 rounded-md text-sm">
                              {val}
                            </span>
                          )
                        })}
                      </div>
                      <div className="flex gap-2 mt-2 justify-between ">
                        <Input placeholder={`Add ${option.name} value`} value={newOptionValue} onChange={(e) => setNewOptionValue(e.target.value)} />
                        <Button type="button" className="cursor-pointer" variant="outline" onClick={() => addOptionValue(index)}>
                          Add Value
                        </Button>
                      </div>
                    </div>
                  )
                })}

                <div className="flex gap-2 justify-between items-center ">
                  <Input placeholder="Option Name (e.g. Size, Color)" onChange={(e) => setNewOptionName(e.target.value)} value={newOptionName} />
                  <Button type="button" className="cursor-pointer" variant="outline" onClick={addOption}>
                    Add Option
                  </Button>
                </div>
              </CardContent>
            </Card>

            {variants && variants.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-4">Variants</h2>
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Variant</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Stock</th>
                        <th className="border p-2">SKU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((variant, index) => {
                        return (
                          <tr key={index}>
                            <td className="border p-2">
                              {Object.keys(variant)
                                .filter((key) => !["price", "quantity", "sku"].includes(key))
                                .map((key) => variant[key])
                                .join(" / ")}
                            </td>
                            <td className="border p-2">
                              <Input placeholder="Price" type="number" value={variant.price} onChange={(e) => handleVariantChange(index, "price", e.target.value)} />
                            </td>
                            <td className="border p-2">
                              <Input placeholder="Stock" type="number" value={variant.quantity} onChange={(e) => handleVariantChange(index, "quantity", e.target.value)} />
                            </td>
                            <td className="border p-2">
                              <Input placeholder="SKU" value={variant.sku} onChange={(e) => handleVariantChange(index, "sku", e.target.value)} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}




