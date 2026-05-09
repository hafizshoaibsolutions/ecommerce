'use client'

import React from 'react'
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-purple-600 transition-colors py-2"
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? <ChevronUp size={18} className="text-purple-600" /> : <ChevronDown size={18} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="mt-4 space-y-3">{children}</div>
      </div>
    </div>
  )
}

function CategoryItem({ category, selectedCategories, onChange, depth = 0, allCategories }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  // Find child categories
  const childCategories = allCategories.filter(cat => cat.parent === category._id)
  const hasChildren = childCategories.length > 0

  const handleChange = () => {
    if (selectedCategories.includes(category._id)) {
      onChange(selectedCategories.filter(id => id !== category._id))
    } else {
      onChange([...selectedCategories, category._id])
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight
              size={16}
              className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        <label className="flex items-center gap-2 cursor-pointer flex-1 hover:text-purple-600 transition-colors">
          <Checkbox
            checked={selectedCategories.includes(category._id)}
            onCheckedChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">{category.name}</span>
        </label>
      </div>

      {/* Child Categories */}
      {hasChildren && isExpanded && (
        <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
          {childCategories.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              selectedCategories={selectedCategories}
              onChange={onChange}
              depth={depth + 1}
              allCategories={allCategories}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryFilter({ categories, selectedCategories, onChange }) {
  // Separate top-level and nested categories
  const topLevelCategories = categories.filter((cat) => !cat.parent)

  return (
    <FilterSection title="Categories" defaultOpen={true}>
      <div className="space-y-2">
        {categories && categories.length > 0 ? (
          topLevelCategories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              selectedCategories={selectedCategories}
              onChange={onChange}
              allCategories={categories}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No categories available</p>
        )}
      </div>
    </FilterSection>
  )
}

function BrandFilter({ brands, selectedBrands, onChange }) {
  const handleChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      onChange(selectedBrands.filter(b => b !== brand))
    } else {
      onChange([...selectedBrands, brand])
    }
  }

  return (
    <FilterSection title="Brands" defaultOpen={true}>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {brands && brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleChange(brand)}
                id={`brand-${brand}`}
                className="w-4 h-4"
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition-colors flex-1"
              >
                {brand}
              </Label>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No brands available</p>
        )}
      </div>
    </FilterSection>
  )
}

function PriceRangeFilter({ minPrice, maxPrice, onMinChange, onMaxChange, availableRange }) {
  const handleSliderChange = (values) => {
    onMinChange(values[0])
    onMaxChange(values[1])
  }

  return (
    <FilterSection title="Price Range" defaultOpen={true}>
      <div className="space-y-4">
        {/* Slider */}
        <div>
          <Slider
            defaultValue={[minPrice, maxPrice]}
            min={availableRange?.minPrice || 0}
            max={availableRange?.maxPrice || 1000}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>

        {/* Price Display */}
        <div className="flex gap-2 items-center bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Min Price</p>
            <p className="text-lg font-bold text-purple-600">${minPrice.toFixed(0)}</p>
          </div>
          <div className="text-gray-400">—</div>
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Max Price</p>
            <p className="text-lg font-bold text-purple-600">${maxPrice.toFixed(0)}</p>
          </div>
        </div>

        {/* Price Inputs */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block font-medium">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onMinChange(Number(e.target.value))}
              min={availableRange?.minPrice || 0}
              max={maxPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block font-medium">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxChange(Number(e.target.value))}
              min={minPrice}
              max={availableRange?.maxPrice || 1000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </FilterSection>
  )
}

function VariantFilter({ variantOptions, selectedVariants, onChange }) {
  const handleChange = (key, value) => {
    const current = selectedVariants[key] || []
    if (current.includes(value)) {
      onChange({
        ...selectedVariants,
        [key]: current.filter(v => v !== value)
      })
    } else {
      onChange({
        ...selectedVariants,
        [key]: [...current, value]
      })
    }
  }

  if (!variantOptions || Object.keys(variantOptions).length === 0) {
    return null
  }

  return (
    <>
      {Object.entries(variantOptions).map(([key, options]) => (
        <FilterSection 
          key={key} 
          title={`${key.charAt(0).toUpperCase() + key.slice(1)}`} 
          defaultOpen={key === 'color'} // Open color by default
        >
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  checked={(selectedVariants[key] || []).includes(option.value)}
                  onCheckedChange={() => handleChange(key, option.value)}
                  id={`${key}-${option.value}`}
                  className="w-4 h-4"
                />
                <Label
                  htmlFor={`${key}-${option.value}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition-colors"
                >
                  {option.value}
                </Label>
                <span className="text-xs text-gray-400 ml-1">({option.count || 0})</span>
              </div>
            ))}
          </div>
        </FilterSection>
      ))}
    </>
  )
}

export { CategoryFilter, BrandFilter, PriceRangeFilter, VariantFilter, FilterSection }

