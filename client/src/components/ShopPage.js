'use client'

import React, { useState } from 'react'
import { Star, ShoppingCart, Eye, Filter, X } from 'lucide-react'

function ShopPage() {
  const [showFilters, setShowFilters] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('popular')

  const [products] = useState([
    {
      id: 1,
      name: 'White Sneakers',
      price: 129.99,
      compareAtPrice: 199.99,
      category: 'shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400',
      rating: 4.5,
      reviews: 120,
      isNew: true,
    },
    {
      id: 2,
      name: 'Black Jacket',
      price: 89.99,
      compareAtPrice: 140.99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=400',
      rating: 4.7,
      reviews: 95,
      isNew: false,
    },
    {
      id: 3,
      name: 'Sport Watch',
      price: 199.99,
      compareAtPrice: 299.99,
      category: 'watches',
      image: 'https://images.unsplash.com/photo-1523170335684-f1b011ebb6e3?q=80&w=400',
      rating: 4.6,
      reviews: 88,
      isNew: true,
    },
    {
      id: 4,
      name: 'Travel Backpack',
      price: 85.99,
      compareAtPrice: 129.99,
      category: 'bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400',
      rating: 4.4,
      reviews: 110,
      isNew: false,
    },
    {
      id: 5,
      name: 'Running Shoes',
      price: 119.99,
      compareAtPrice: 159.99,
      category: 'shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&flip=h',
      rating: 4.8,
      reviews: 150,
      isNew: true,
    },
    {
      id: 6,
      name: 'Casual T-Shirt',
      price: 29.99,
      compareAtPrice: 49.99,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400',
      rating: 4.3,
      reviews: 75,
      isNew: false,
    },
    {
      id: 7,
      name: 'Leather Wallet',
      price: 45.99,
      compareAtPrice: 75.99,
      category: 'bags',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400',
      rating: 4.5,
      reviews: 60,
      isNew: true,
    },
    {
      id: 8,
      name: 'Smartwatch',
      price: 249.99,
      compareAtPrice: 399.99,
      category: 'watches',
      image: 'https://images.unsplash.com/photo-1579364848889-180a8867fd8f?q=80&w=400',
      rating: 4.7,
      reviews: 125,
      isNew: false,
    },
  ])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'watches', name: 'Watches' },
    { id: 'bags', name: 'Bags' },
  ]

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'newest') return b.isNew ? 1 : -1
    return 0
  })

  const renderRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Shop</h1>
          <p className="text-gray-600">Browse our collection of {filteredProducts.length} products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${!showFilters && 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-black flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-black mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-black mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">${priceRange[0]}</span>
                    <span className="text-gray-700">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-black mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">& up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 text-purple-600 font-semibold">
                <Filter className="w-5 h-5" /> Filters
              </button>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-xs font-bold z-10">
                          New
                        </div>
                      )}
                      {product.compareAtPrice && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold z-10">
                          Sale
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Action Buttons */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button className="bg-white text-gray-800 p-3 rounded-full hover:bg-purple-600 hover:text-white transition">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" /> Add Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm hover:text-purple-600 cursor-pointer transition line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-2 mb-3">
                        {renderRating(product.rating)}
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-black">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.compareAtPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg">
                <p className="text-gray-600 text-lg">No products found with your selected filters.</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">Previous</button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopPage
