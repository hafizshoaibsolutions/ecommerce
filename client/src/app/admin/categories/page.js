'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../../store/slices/categorySlice';
import CategoryForm from '../../../components/CategoryForm';
import CategoryList from '../../../components/CategoryList';
import React from 'react'

function page() {
    const pathname = usePathname(); 
    const router = useRouter();
    const path = pathname.split('/').filter(item => item !== '');
    const title = path[path.length - 1];

    const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchCategories())
   }, [dispatch]);



  return (
   
    <div className=" bg-gray-50 min-h-screen">
      {/* Breadcrumbs & Header */}
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
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CategoryForm />
        </div>
        <div className="md:col-span-2">
          <CategoryList  />
        </div>
      </div>
    </div>
    
  )
}

export default page