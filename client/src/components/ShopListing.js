'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { List, X } from 'lucide-react'
import { fetchCategories } from '@/store/slices/categorySlice'
import { getBreadCrumb } from '@/lib/category'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ShopListingBreadCrumb from './ShopListingBreadCrumb'
import ProductCard from './ProductCard'
import { CategoryFilter, BrandFilter, PriceRangeFilter, VariantFilter } from './FiltersComponents'

const API_BASE = 'http://localhost:5000/api'

function ShopListing() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')

  // Products state
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState(categoryId ? [categoryId] : [])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [sortBy, setSortBy] = useState('newest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter options state
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    variantOptions: {},
    priceRange: { minPrice: 0, maxPrice: 1000 },
    variantKeys: []
  })

  // Get categories from Redux
  const { allCategories: categories } = useSelector((state) => state.categories)

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Calculate breadcrumb using existing logic
  const breadCrumb = useMemo(
    () => {
      if (!categories || categories.length === 0) {
        return [{ _id: 'home', name: 'Home', href: '/' }]
      }
      return getBreadCrumb(selectedCategories.length > 0 ? selectedCategories[0] : null, categories) || [{ _id: 'home', name: 'Home', href: '/' }]
    },
    [selectedCategories, categories]
  )

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const query = new URLSearchParams()
        if (selectedCategories.length > 0) {
          query.append('category', selectedCategories[0])
        }

        const response = await axios.get(`${API_BASE}/products/filter-options?${query}`)
        if (response.data.success) {
          setFilterOptions(response.data)
          if (response.data.priceRange?.maxPrice) {
            setMaxPrice(response.data.priceRange.maxPrice)
          }
        }
      } catch (error) {
        console.error('Error fetching filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [selectedCategories])

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams()

        if (selectedCategories.length > 0) {
          query.append('category', selectedCategories[0])
        }

        query.append('minPrice', minPrice)
        query.append('maxPrice', maxPrice)

        if (selectedBrands.length > 0) {
          query.append('brands', selectedBrands.join(','))
        }

        query.append('page', currentPage)
        query.append('limit', 12)

        switch (sortBy) {
          case 'price-low':
            query.append('sort', 'price')
            break
          case 'price-high':
            query.append('sort', '-price')
            break
          case 'newest':
            query.append('sort', '-createdAt')
            break
          default:
            break
        }

        const response = await axios.get(`${API_BASE}/products/get-product?${query}`)
        if (response.data.success) {
          setProducts(response.data.products)
          setTotalPages(response.data.totalPages)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategories, selectedBrands, minPrice, maxPrice, currentPage, sortBy])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, selectedBrands, minPrice, maxPrice, sortBy])

  // Count active filters
  const activeFiltersCount = [
    selectedCategories.length > 0 ? 1 : 0,
    selectedBrands.length,
    minPrice > 0 ? 1 : 0,
    maxPrice < filterOptions.priceRange.maxPrice ? 1 : 0,
    Object.values(selectedVariants).reduce((sum, arr) => sum + arr.length, 0)
  ].reduce((a, b) => a + b, 0)

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setMinPrice(0)
    setMaxPrice(filterOptions.priceRange.maxPrice)
    setSelectedVariants({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <ShopListingBreadCrumb breadCrumb={breadCrumb} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{products.length}</span> of{' '}
              <span className="font-bold text-gray-900">{totalPages * 12}</span> products
            </span>
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                  {activeFiltersCount}
                </span>
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Sort Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-52 border-gray-300">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <List size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0">
                <SheetHeader className="border-b border-gray-200 p-6">
                  <SheetTitle className="text-2xl font-bold text-gray-900">Filters</SheetTitle>
                </SheetHeader>

                <div className="overflow-y-auto h-[calc(100vh-120px)] p-6 space-y-2">
                  <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                  />
                  <BrandFilter
                    brands={filterOptions.brands}
                    selectedBrands={selectedBrands}
                    onChange={setSelectedBrands}
                  />
                  <PriceRangeFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinChange={setMinPrice}
                    onMaxChange={setMaxPrice}
                    availableRange={filterOptions.priceRange}
                  />
                  <VariantFilter
                    variantOptions={filterOptions.variantOptions}
                    selectedVariants={selectedVariants}
                    onChange={setSelectedVariants}
                  />

                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-32 shadow-sm max-h-[calc(100vh-180px)] overflow-y-auto">
              {activeFiltersCount > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Clear All Filters ({activeFiltersCount})
                  </Button>
                </div>
              )}

              <div className="space-y-1">
                <CategoryFilter
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                />
                <BrandFilter
                  brands={filterOptions.brands}
                  selectedBrands={selectedBrands}
                  onChange={setSelectedBrands}
                />
                <PriceRangeFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onMinChange={setMinPrice}
                  onMaxChange={setMaxPrice}
                  availableRange={filterOptions.priceRange}
                />
                <VariantFilter
                  variantOptions={filterOptions.variantOptions}
                  selectedVariants={selectedVariants}
                  onChange={setSelectedVariants}
                />
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-96 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 py-8 flex-wrap">
                    <Button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                      className="border-gray-300"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            className={
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0'
                                : 'border-gray-300'
                            }
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      className="border-gray-300"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-gray-200 border-dashed">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters or try another search</p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopListing
