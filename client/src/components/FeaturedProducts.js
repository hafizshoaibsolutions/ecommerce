'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Star, ShoppingCart, Eye } from 'lucide-react'

const API_BASE = 'http://localhost:5000/api'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE}/products/featured`)
        setProducts(response.data.slice(0, 4)) // Show first 4 products
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback mock data
        setProducts([
          {
            _id: '1',
            name: 'Air Jordan 1 Retro',
            price: 120,
            compareAtPrice: 150,
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400'],
            rating: 4.5,
            reviews: 120,
          },
          {
            _id: '2',
            name: 'Classic G-Shock',
            price: 99,
            compareAtPrice: 130,
            images: ['https://images.unsplash.com/photo-1523170335684-f1b011ebb6e3?q=80&w=400'],
            rating: 4.8,
            reviews: 95,
          },
          {
            _id: '3',
            name: 'Leather Jacket',
            price: 280,
            compareAtPrice: 350,
            images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=400'],
            rating: 4.6,
            reviews: 88,
          },
          {
            _id: '4',
            name: 'Travel Backpack',
            price: 85,
            compareAtPrice: 120,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400'],
            rating: 4.7,
            reviews: 110,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const renderRating = (rating) => {
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600">({rating})</span>
      </div>
    )
  }

  if (loading) return <div className="text-center py-16">Loading...</div>

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black">Featured Products</h2>
            <p className="text-gray-600 mt-2">Explore our best selling items</p>
          </div>
          <button className="text-purple-600 font-semibold hover:text-purple-700 transition">
            View All →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 h-64">
                {product.compareAtPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold z-10">
                    Sale
                  </div>
                )}
                <img
                  src={product.images?.[0] || ''}
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
                <h3 className="font-semibold text-gray-800 text-sm hover:text-purple-600 cursor-pointer transition">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && renderRating(product.rating)}

                {/* Price */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-lg font-bold text-black">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.compareAtPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
