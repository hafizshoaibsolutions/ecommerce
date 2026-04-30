'use client'

import React, { useState } from 'react'
import { Star, Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react'

function ProductDetail({ product = null }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('white')
  const [selectedSize, setSelectedSize] = useState('M')
  const [isFavorite, setIsFavorite] = useState(false)

  // Default product data
  const defaultProduct = {
    name: 'Premium White Sneakers',
    price: 129.99,
    compareAtPrice: 199.99,
    rating: 4.5,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&flip=h',
    ],
    colors: ['white', 'black', 'gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Experience ultimate comfort and style with our premium sneakers. Crafted with high-quality materials and modern design, these shoes are perfect for everyday wear.',
    features: [
      'Premium leather upper',
      'Cushioned sole for comfort',
      'Breathable mesh lining',
      'Durable rubber outsole',
      'Available in multiple colors',
    ],
    inStock: true,
  }

  const prod = product || defaultProduct

  const handleAddToCart = () => {
    console.log('Added to cart:', { quantity, selectedColor, selectedSize })
    // Add to cart logic here
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 md:h-[500px] flex items-center justify-center">
              <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-contain p-8" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {prod.images.map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-purple-600">
                  <img src={image} alt={`${prod.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Title and Rating */}
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{prod.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {renderStars(prod.rating)}
                <span className="text-gray-600">({prod.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-black">${prod.price}</span>
                {prod.compareAtPrice && (
                  <span className="text-xl text-gray-500 line-through">${prod.compareAtPrice}</span>
                )}
              </div>
              {prod.compareAtPrice && (
                <p className="text-green-600 font-semibold mt-2">
                  Save ${(prod.compareAtPrice - prod.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-6">{prod.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-3">Color</h3>
              <div className="flex gap-4">
                {prod.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'ring-2 ring-purple-600 border-purple-600' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-3">Size</h3>
              <div className="flex gap-3">
                {prod.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 text-gray-800 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-black mb-3">Quantity</h3>
              <div className="flex items-center gap-4 w-fit border border-gray-300 rounded-lg p-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:bg-gray-100 rounded">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:bg-gray-100 rounded">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!prod.inStock}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                prod.inStock
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {prod.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-black mb-4">Key Features</h3>
              <ul className="space-y-3">
                {prod.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-purple-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
