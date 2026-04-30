'use client'

import React from 'react'
import { useCachedCategories } from '@/hooks/useCachedCategories'
import { ChevronRight } from 'lucide-react'

function CategorySection() {
  const { categories, loading } = useCachedCategories()

  const categoryImages = {
    shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400',
    clothing: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=400',
    watches: 'https://images.unsplash.com/photo-1523170335684-f1b011ebb6e3?q=80&w=400',
    bags: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400',
  }

  if (loading) return <div className="text-center py-16">Loading...</div>

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Shop By Category</h2>
          <p className="text-gray-600 mt-2">Explore our wide range of products</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((category) => (
            <div
              key={category._id}
              className="group relative overflow-hidden rounded-xl bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer h-64"
            >
              {/* Image */}
              <img
                src={category.images[0] || categoryImages[category.name.toLowerCase()] || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-start p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-gray-100 text-sm mt-1 flex items-center gap-2">
                    View More <ChevronRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
