'use client';
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '@/store/slices/productSlice';
import { useRouter } from 'next/navigation';

function page() {

  const router = useRouter();
  console.log("Router object:", router);
  const params = useParams();
  console.log("Route parameters:", params);
  const { id } = params;
  console.log("Product ID from route:", id);
  const dispatch = useDispatch();

  const { productDetails } = useSelector((state) => state.product);

  console.log(productDetails.product,"product details from store");
   

  useEffect(()=>{
    dispatch(getProductById(id));
  },[dispatch,id]);


  return (
    <div className='p-4 space-y-6'>
        <div className='p-4 bg-[#FFFFFF] border-[#E5E7EB] border-1 rounded-lg  shadow-sm '>
           <h3 className='text-xl font-semibold '>
              Product Images
           </h3>
            {productDetails && productDetails.product && productDetails.product.images.length > 0 ? (
              <div className='flex space-x-4  overflow-x-auto mt-4'>
                {productDetails.product.images.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} className='w-33 h-33 object-cover rounded-lg'/>
                ))}
              </div>
            ) : (
              <p>No images available for this product.</p>
            )}
             
        </div>
        <div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
          {/* Basic Information */}
          <div className='md:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm '>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className='space-y-2'>

             <div>
              <p className="text-sm text-[#374151] font-semibold">Product Title</p>
              <h3 className="text-xl font-semibold text-[#111827]">
                {productDetails?.title}
              </h3>
            </div>
              <div>
              <p className="text-sm text-[#374151] font-semibold">Description</p>
              <p className="text-[#516572] text-md font-semibold">
                {productDetails?.product?.description}
              </p>
            </div>
            
            <div className="flex justify-between items-center text-sm mt-4">
              <div>
                <p className="text-[#374151] text-md font-semibold">Price</p>
                <p className="font-bold text-[#16A34A] text-2xl">${productDetails?.product?.price}</p>
              </div>
              <div>
                <p className="text-[#374151] text-md font-semibold">Vendor</p>
                <p className="font-semibold text-lg">{productDetails?.product?.vendor}</p>
              </div>
            </div>


            


            

          </div>


          
              
        </div>
        <div  className="bg-white p-6 rounded-2xl shadow-sm border-[#E5E7EB] border-1">
           <h2 className="text-xl font-semibold mb-4 ">Organization</h2>

        
          
        <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-[#374151] mb-1">Categories</p>

              <div className="flex flex-wrap gap-2">

                {productDetails?.categories && productDetails.categories.length > 0 ? (
                  productDetails.categories.map((category, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-md">{category}</span>
                  ))
                ) : (
                  <span className="text-gray-500">No categories assigned.</span>
                )}

                
              </div>
            </div>

          <div>
              <p className="text-sm  font-semibold text-[#374151] mb-1">Collections</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-md">Premium Audio</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-md">Best Sellers</span>
              </div>
          </div>
        </div>
        
        </div>
        </div>
    </div>
  )
}

export default page