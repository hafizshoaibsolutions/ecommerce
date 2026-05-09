import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SubCategoryList() {

   const searchParams = useSearchParams()
    const categoryId = searchParams.get('category')



    const subCategories = [
        { _id: '1', name: 'SubCategory 1' },
        { _id: '2', name: 'SubCategory 2' },
        { _id: '3', name: 'SubCategory 3' },
    ]




  return (
    <div className='border-b py-4 '>
        {
            subCategories.map((sub) => (
                <Link key={sub._id} href={`/products?category=${categoryId}&subcategory=${sub._id}`} className='block py-2 font-semibold text-md text-gray-700 hover:text-gray-900 transition-colors'>
                    {sub.name}
                </Link>
            ))
        }
    </div>
  )
}

export default SubCategoryList