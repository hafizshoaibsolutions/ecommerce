'use client'

import React from 'react'
import { Heart, Award, Users, Globe } from 'lucide-react'

function AboutSection() {
  const stats = [
    { icon: Users, label: 'Customers', value: '50K+' },
    { icon: Globe, label: 'Countries', value: '25+' },
    { icon: Award, label: 'Awards Won', value: '15+' },
    { icon: Heart, label: 'Success Rate', value: '98%' },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else.',
    },
    {
      icon: Award,
      title: 'Quality Products',
      description: 'We curate only the best products from trusted brands.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We ship to over 25 countries worldwide with fast delivery.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build a community of happy and satisfied customers.',
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">About Us</h1>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Founded in 2020, our e-commerce platform has quickly become a trusted destination for quality products
              and exceptional customer service. We believe in making online shopping easy, affordable, and enjoyable
              for everyone.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our mission is simple: to deliver premium products at competitive prices with outstanding customer support.
              We work closely with trusted brands and manufacturers to bring you the best selection of products.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <p className="text-gray-700">Fast and reliable shipping to your doorstep</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <p className="text-gray-700">Secure payment options and data protection</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <p className="text-gray-700">24/7 customer support for all your queries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 py-12 border-y border-gray-200">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core values guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Meet Our Team</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            We have a dedicated team of professionals committed to delivering the best experience for our customers.
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            See Our Team
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
