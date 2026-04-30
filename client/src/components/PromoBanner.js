'use client'

import React from 'react'
import { Volume2, Headphones } from 'lucide-react'

function PromoBanner() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-100 via-purple-50 to-white shadow-lg">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center z-10">
              {/* Badge */}
              <div className="inline-flex items-center w-fit mb-4">
                <span className="text-xs md:text-sm font-semibold tracking-wider text-purple-600 uppercase">Limited Time Offer</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
                UP TO 50% OFF
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8">
                Discover exclusive deals on premium audio equipment. Find the perfect sound for your lifestyle.
              </p>

              {/* Button */}
              <button className="w-fit bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                Shop Now
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center items-center z-10">
              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                {/* Floating Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main Product */}
                  <div className="relative z-20">
                    <Headphones className="w-48 h-48 md:w-64 md:h-64 text-purple-600 drop-shadow-lg" />
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute top-8 right-8 bg-purple-600 rounded-full p-4 shadow-lg animate-bounce">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
