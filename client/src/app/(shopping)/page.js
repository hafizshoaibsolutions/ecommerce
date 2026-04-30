import DiscountBanner from '@/components/DiscountBanner'
import HeroSection from '@/components/HeroSection'
import React from 'react'
import { Ca } from 'zod/v4/locales'
import CategorySection from '@/components/CategorySection'
import FeaturedProducts from '@/components/FeaturedProducts'
import PromoBanner from '@/components/PromoBanner'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

function page() {
  return (
    <>
   <HeroSection />
   <CategorySection />
   <FeaturedProducts />
   <PromoBanner />
   <WhyChooseUs />
   <Testimonials />
   <Newsletter />
   <Footer />
    </>
  )
}

export default page