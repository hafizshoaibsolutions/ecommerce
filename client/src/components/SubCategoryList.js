import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { current } from '@reduxjs/toolkit'

function SubCategoryList({currentCategory, children, siblings}) {

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
  console.log(siblings,"siblings in SubCategoryList")

  const sidebarCategories = children && children.length > 0 ? children : siblings
  return (
    <div className='border-b  pb-2 pt-2'>
        {
            sidebarCategories.map((sub) => (
                <Link key={sub._id} href={`/products?category=${sub.slug}`} className={`block py-2 font-semibold text-md   transition-colors ${sub._id === currentCategory?._id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {sub.name}
                </Link>
            ))
        }
    </div>
  )
}

export default SubCategoryList