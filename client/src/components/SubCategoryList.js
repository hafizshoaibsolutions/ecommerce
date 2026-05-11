import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { current } from '@reduxjs/toolkit'

function SubCategoryList({currentCategory, children}) {

   const searchParams = useSearchParams()
    const categoryId = searchParams.get('category')



    const subCategories = [
        { _id: '1', name: 'SubCategory 1' },
        { _id: '2', name: 'SubCategory 2' },
        { _id: '3', name: 'SubCategory 3' },
    ]


  console.log(categoryId,"category id in SubCategoryList")
  console.log(currentCategory,"current category in SubCategoryList")
  console.log(children,"children in SubCategoryList")

  return (
    <div className='border-b py-4 '>
        {
            children.map((sub) => (
                <Link key={sub._id} href={`/products?category=${sub.slug}`} className='block py-2 font-semibold text-md text-gray-700 hover:text-gray-900 transition-colors'>
                    {sub.name}
                </Link>
            ))
        }
    </div>
  )
}

export default SubCategoryList