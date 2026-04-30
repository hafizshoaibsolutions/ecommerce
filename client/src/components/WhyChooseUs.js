'use client'

import React from 'react'
import { Truck, RotateCcw, Lock, HeadphonesIcon } from 'lucide-react'

function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On all orders above $50. Fast and reliable delivery to your doorstep.',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy. No questions asked. Hassle-free returns.',
    },
    {
      icon: Lock,
      title: 'Secure Payment',
      description: '100% secure transactions. Your data is encrypted and protected.',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries and concerns.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We believe in providing the best shopping experience with quality products and exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
