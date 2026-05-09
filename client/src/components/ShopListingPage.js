import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch,useSelector } from 'react-redux'
import ShopListingBreadCrumb from './ShopListingBreadCrumb'
import ListingFilter from './ListingFilter'
import { fetchCategories } from '@/store/slices/categorySlice'
import { getBreadCrumb } from '@/lib/category'
 

function ShopListingPage() {

    
const dispatch = useDispatch()
const  categories  = useSelector((state) => state.categories.allCategories)
console.log('Categories in ShopListingPage:', categories)
const searchParams = useSearchParams()
const categoryId = searchParams.get('category')

console.log(categoryId,"category id")


useEffect(() => {
        // You can dispatch an action here to fetch products based on categoryId
        // For example: dispatch(fetchProductsByCategory(categoryId))
        // This is just a placeholder to show where you would put your fetching logic
        console.log('Category ID from URL:', categoryId)

        dispatch(fetchCategories()) // Fetch categories to ensure breadcrumb has data
        
}, [dispatch, categoryId])

const breadcrumbItems = React.useMemo(() => {
        if (!categories || categories.length === 0) {
          return [{ _id: 'home', name: 'Home', href: '/' }]
        }

    return getBreadCrumb(categoryId, categories) 

}, [categoryId, categories])

console.log(breadcrumbItems,"breadcrumb items in ShopListingPage")

  return (
    <div className="">
      <div className='px-4 lg:px-8 py-4'>
          <ShopListingBreadCrumb items={breadcrumbItems} />
      </div>
      
        <ListingFilter />    
    </div>
  )
}

export default ShopListingPage