'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GoPlus } from "react-icons/go";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getAllProducts } from '@/store/slices/productSlice';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';



function ProductsPage() {

  const{ products } = useSelector(state => state.product);

  console.log("Products in store:", products.products);

  const productList = products.products;

  const pathname = usePathname(); 
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllProducts()).then((response) => {
      if(response.payload.success){
        console.log("Products fetched successfully:", response.payload.products);
      } else {
        console.error("Failed to fetch products:", response.payload.message);
      }
    });
  }, [dispatch]);





  const path = pathname.split('/').filter(item => item !== '');
  const title = path[path.length - 1];

  return (
    <div className=''>
      <div className='flex items-center justify-between gap-2 px-2 py-3  border-gray-700 '>
        <h2 className='text-xl font-bold capitalize'>{title}</h2>
        <div className='flex items-center gap-2'>
          {path.map((item, index) => {
            const fullPath = '/' + path.slice(0, index + 1).join('/');
            const isActive = fullPath === pathname;

            return (
              <div key={index} className='flex items-center gap-2'>
                <p
                  className={`text-sm cursor-pointer hover:text-gray-300 ${
                    isActive ? 'text-black ' : 'text-gray-500'
                  }`}
                  onClick={() => router.push(fullPath)}
                >
                  {item}
                </p>
                {index !== path.length - 1 && (
                  <p className='text-sm text-gray-500'>{'>'}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className=' rounded-xl py-4  mt-4 bg-white border-1 border-[#E4E7EC]'>
      <div className='flex flex-col gap-4 sm:flex-row items-center justify-between w-full border-b border-[#E4E7EC] px-4 pb-4 '>

       <div className='flex flex-col gap-1'>
        <h2 className='text-xl text-[#412939] font-bold'>Products List</h2>
        <p className=' text-sm text-gray-500'>Track your store's progress to boost your sales.</p>
       </div>
       <div className='flex justify-center gap-9 sm:gap-1'>
       <button type="button" className="cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-600">Light</button>
      <Button className="bg-gray-300 hover:bg-gray-400 text-black cursor-pointer" onClick={()=>router.push("/admin/products/add-product")}>
        Add Product
      </Button>
       </div>
       </div>

<div className='flex justify-between items-center p-4 border-b border-[#E4E7EC] gap-3'>
 {/* component */}
<div className="max-w-md">
  <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-[#E4E7EC]">
    <div className="grid place-items-center h-full w-20 text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder="Search something.." /> 
  </div>
</div>

<button type="button" className="cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>


      </div>

      

<div className="relative overflow-x-auto  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Product name
            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg></a>
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Color
            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg></a>
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Category
            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg></a>
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">
            Price
            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg></a>
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>


  <tbody>
    { productList && productList.map((product) => (
      <tr key={product._id || product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {product.title}
        </th>
        
           <td className="px-6 py-4">
        <div className="flex gap-2">
          {product?.variants.map((variant, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border shadow"
              style={{ backgroundColor: variant.options.color }}
              title={variant.options.color} // Tooltip
            ></div>
          ))}
        </div>
      </td>
        
        <td className="px-6 py-4">
          {product.category || "—"}
        </td>
        <td className="px-6 py-4">
          ${product?.price}
        </td>
        <td className="px-6 py-4 text-right">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEdit(product._id)}>Edit</a>
        </td>
      </tr>
    ))}
  </tbody>

    
  </table>
</div>
<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <LuChevronLeft aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <LuChevronRight aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>




      </div>

      

    </div>
  );
}

export default ProductsPage;
