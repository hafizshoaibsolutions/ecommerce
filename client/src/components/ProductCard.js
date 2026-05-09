'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Calculate discount percentage
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const discount = product.compareAtPrice > product.price

  return (
    <Link href={`/shopping/product/${product._id}`}>
      <div 
        className="group relative h-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
              <span>−{discountPercent}%</span>
            </div>
          )}

          {/* New Badge */}
          {product.createdAt && new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              New
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              size="icon"
              className="rounded-full bg-white text-gray-900 hover:bg-purple-500 hover:text-white shadow-lg h-12 w-12"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={20} />
            </Button>
            <Button
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
              className={`rounded-full shadow-lg h-12 w-12 ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-900 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </Button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col gap-3">
          {/* Category Badge */}
          {product.categories && product.categories.length > 0 && (
            <div className="text-xs text-purple-600 font-semibold uppercase tracking-wide">
              {product.categories[0]?.name || 'Category'}
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors text-sm h-10">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">(4.5)</span>
          </div>

          {/* Price Section */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                ${product.price?.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  ${product.compareAtPrice?.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Variant Info */}
          {product.variants && product.variants.length > 0 && (
            <div className="text-xs text-gray-500 font-medium">
              {product.variants.length} option{product.variants.length !== 1 ? 's' : ''} available
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className="w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
            onClick={(e) => e.preventDefault()}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
