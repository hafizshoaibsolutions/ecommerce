'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <span className="font-semibold text-sm uppercase tracking-wider">Newsletter</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-purple-100 text-lg">
              Get exclusive deals, new product launches, and insider shopping tips delivered to your inbox every week.
            </p>
          </div>

          {/* Right Form */}
          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Success Message */}
            {subscribed && (
              <p className="text-white mt-4 text-sm flex items-center gap-2">
                ✓ Thank you for subscribing!
              </p>
            )}

            {/* Disclaimer */}
            <p className="text-purple-100 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
