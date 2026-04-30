import React from 'react'
import { ShoppingCart, RotateCcw, Lock } from 'lucide-react'

function HeroSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center w-fit mb-6">
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[#7257DD] uppercase">
                New Collection
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Upgrade Your Style Today
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Discover the latest collection of premium products at the best prices.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-[#7257DD] hover:bg-[#5A42C8] text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                Shop Now
              </button>
              <button className="border-2 border-gray-800 hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-semibold transition duration-300">
                Explore Collection
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Shipping */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On all orders</p>
                </div>
              </div>

              {/* Easy Returns */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <RotateCcw className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30-day return</p>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Lock className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                  <p className="text-sm text-gray-500">100% secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Purple Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100 rounded-full blur-3xl opacity-80" />

              {/* Product Image */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Premium Sneaker"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection