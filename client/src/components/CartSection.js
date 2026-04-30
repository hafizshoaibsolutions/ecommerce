'use client'

import React, { useState } from 'react'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'

function CartSection() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'White Sneakers',
      price: 129.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200',
    },
    {
      id: 2,
      name: 'Black Jacket',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=200',
    },
    {
      id: 3,
      name: 'Sport Watch',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523170335684-f1b011ebb6e3?q=80&w=200',
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 p-6 flex gap-6 hover:bg-gray-50 transition-colors">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black text-lg hover:text-purple-600 cursor-pointer transition">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4 w-fit border border-gray-300 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price and Delete */}
                    <div className="text-right">
                      <p className="font-bold text-black text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-4 text-red-600 hover:text-red-700 transition flex items-center gap-2 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">Your cart is empty</p>
                <button className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 mb-4">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <button className="w-full border-2 border-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Continue Shopping
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">✓ Free Shipping</span> on orders above $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartSection
