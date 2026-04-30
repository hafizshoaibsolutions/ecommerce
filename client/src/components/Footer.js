'use client'

import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Quick: ['Home', 'Shop', 'About Us', 'Contact Us'],
    Support: ['Help Center', 'Track Order', 'Returns', 'Shipping Info'],
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-xl mb-4">Logo</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your one-stop destination for premium products at the best prices.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-800 p-2 rounded-full hover:bg-purple-600 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pt-8 border-t border-gray-800">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-semibold mb-2">Address</h5>
              <p className="text-gray-400 text-sm">123 Main Street, City, Country 12345</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-semibold mb-2">Phone</h5>
              <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-semibold mb-2">Email</h5>
              <p className="text-gray-400 text-sm">support@ecommerce.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {currentYear} Your Store. All Rights Reserved.</p>
          <div className="flex gap-4">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
