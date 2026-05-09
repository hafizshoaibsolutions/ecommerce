'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoPlus } from "react-icons/go";
import { LuChevronLeft, LuChevronRight, LuTrash2, LuSearch } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { getAllProducts } from '@/store/slices/productSlice';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function ProductsPage() {
  const { products: productList, isLoading, currentPage, totalPages } = useSelector(state => state.product);

  const pathname = usePathname(); 
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch products on mount and when page changes
  useEffect(() => {
    dispatch(getAllProducts({ search: searchTerm, page }));
  }, [dispatch, page, searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1); // Reset to page 1 when searching
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setDeleteLoading(productId);
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      
      if (response.data.success) {
        // Refresh the products list
        dispatch(getAllProducts({ search: searchTerm, page }));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      setDeleteLoading(null);
    }
  };

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
 {/* Search component */}
<div className="max-w-md flex-1">
  <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-[#E4E7EC]">
    <div className="grid place-items-center h-full w-12 text-gray-400">
      <LuSearch className="h-5 w-5" />
    </div>
    <input 
      className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" 
      type="text" 
      id="search" 
      placeholder="Search by product name..." 
      value={searchTerm}
      onChange={handleSearch}
    /> 
  </div>
</div>

<button type="button" className="cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Filter</button>

</div>

      

<div className="relative overflow-x-auto sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-[#E4E7EC]">
      <tr>
        <th scope="col" className="px-6 py-4">
          Product Name
        </th>
        <th scope="col" className="px-6 py-4">
          Price
        </th>
        <th scope="col" className="px-6 py-4">
          Category
        </th>
        <th scope="col" className="px-6 py-4">
          Stock
        </th>
        <th scope="col" className="px-6 py-4">
          Status
        </th>
        <th scope="col" className="px-6 py-4">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan="6" className="px-6 py-8 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </td>
        </tr>
      ) : productList && productList.length > 0 ? (
        productList.map((product) => (
          <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-[#E4E7EC] hover:bg-gray-50 transition-colors">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs">
              <div className="flex items-center gap-3">
                {product?.images && product.images[0] && (
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <span className="truncate">{product.title}</span>
              </div>
            </td>
            
            <td className="px-6 py-4 font-semibold text-purple-600">
              ${product?.price || '0'}
            </td>

            <td className="px-6 py-4">
              {product?.categories && product.categories.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {product.categories.slice(0, 2).map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                    >
                      {typeof cat === 'object' ? cat.name : cat}
                    </span>
                  ))}
                  {product.categories.length > 2 && (
                    <span className="text-xs text-gray-500">+{product.categories.length - 2} more</span>
                  )}
                </div>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className={`${product?.quantity > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}`}>
                  {product?.quantity || 0}
                </span>
                {product?.quantity <= 5 && product?.quantity > 0 && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Low</span>
                )}
                {product?.quantity === 0 && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Out</span>
                )}
              </div>
            </td>

            <td className="px-6 py-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                product?.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {product?.status || 'inactive'}
              </span>
            </td>

            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Link 
                  href={`/admin/products/${product._id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <FaEdit className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  disabled={deleteLoading === product._id}
                  className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition-colors disabled:opacity-50"
                >
                  <LuTrash2 className="h-4 w-4" />
                  {deleteLoading === product._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm">Create your first product to get started</p>
              <Button 
                onClick={() => router.push('/admin/products/add-product')}
                className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
              >
                <GoPlus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </td>
        </tr>
      )}
    </tbody>

    
  </table>
</div>

<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <LuChevronLeft aria-hidden="true" className="size-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
              Math.max(0, page - 2),
              Math.min(totalPages, page + 1)
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageNum === page
                    ? 'z-10 bg-purple-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
                    : 'text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <LuChevronRight aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}

export default ProductsPage;
