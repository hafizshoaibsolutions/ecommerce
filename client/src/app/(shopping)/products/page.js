'use client'

import ListingTopBar from '@/components/ListingTopBar'
import ShopListingSidebar from '@/components/ShopListingSidebar'
import ShopListingBreadCrumb  from '@/components/ShopListingBreadCrumb'


import { List } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "next/navigation"
import { getBreadCrumb } from '@/lib/category'
import React, { useEffect, useMemo } from 'react'

import { fetchCategories } from '@/store/slices/categorySlice'

function page() {


  const dispatch = useDispatch()

  useEffect(() =>{

    dispatch (fetchCategories())


  },[ dispatch ])
  const { allCategories: categories } = useSelector((state) => state.categories)


  console.log(categories, "categories in page component")
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  
  // Memoize breadcrumb calculation to prevent expensive recomputations
  const breadCrumb = useMemo(() => getBreadCrumb(categoryId, categories), [categoryId, categories])





  


  return (
    <div className=''>
      <div className='mt-6 px-4'>
        <ShopListingBreadCrumb  items={breadCrumb} />
      </div>
    
    <ShopListingSidebar />
    </div>
  )
}

export default page