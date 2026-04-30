'use client'

import React from 'react'
import { Star } from 'lucide-react'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      content:
        'The quality of products is exceptional and the delivery was super fast. I\'m impressed with the customer service team!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    },
    {
      id: 2,
      name: 'Michael Brown',
      role: 'Tech Buyer',
      content:
        'Best prices I\'ve found online for premium products. The return process was smooth and hassle-free.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Regular Customer',
      content:
        'Love the variety and the user-friendly website. Products arrive in perfect condition every time!',
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
    },
  ]

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Join thousands of satisfied customers worldwide</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              {/* Rating */}
              <div className="mb-4">{renderStars(testimonial.rating)}</div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-300">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
