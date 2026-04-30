// 'use client'

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const API_BASE = 'http://localhost:5000/api/products'

// function DiscountBanner() {
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchDiscountBannerProduct = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/get-discount-banner-product`)
//         setProduct(response.data?.promoProduct || null)
//       } catch (err) {
//         console.error('Error loading discount banner product:', err)
//         setError('Could not load the best deal right now.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDiscountBannerProduct()
//   }, [])

//   const discountPercent = product
//     ? Math.round(
//         ((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100
//       )
//     : 0
//   const savingAmount = product
//     ? (Number(product.compareAtPrice) - Number(product.price)).toFixed(2)
//     : null
//   const imageUrl = product?.images?.[0] || ''

//   return (
//     <section className='mt-10 mx-6 md:mx-10'>
//       <div className='overflow-hidden rounded-[2rem] bg-white text-black shadow-2xl shadow-gray-200/50 border border-gray-200'>
//         <div className='relative overflow-hidden px-6 py-10 md:px-14 md:py-14'>
//           <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_30%)]' />
//           <div className='absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-white via-white/95 to-transparent' />
//           <div className='relative grid gap-8 lg:grid-cols-[1.45fr_1fr] items-center'>
//             <div className='max-w-2xl'>
//               <span className='inline-flex rounded-full border border-blue-300/30 bg-blue-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700'>Top Deal</span>
//               <h2 className='mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl'>Highest discount on your store</h2>
//               <p className='mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base'>
//                 Discover the product with the biggest savings across all products. This section updates automatically as new discounts are added.
//               </p>

//               {loading ? (
//                 <div className='mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600'>Loading the best discount...</div>
//               ) : error ? (
//                 <div className='mt-8 rounded-3xl border border-rose-500/30 bg-rose-50 p-6 text-sm text-rose-700'>{error}</div>
//               ) : product ? (
//                 <div className='mt-8 grid gap-4 sm:grid-cols-2'>
//                   <div className='rounded-3xl border border-gray-200 bg-gray-50 p-6'>
//                     <p className='text-xs uppercase tracking-[0.25em] text-gray-500'>Deal</p>
//                     <p className='mt-2 text-3xl font-bold text-blue-600'>{discountPercent}% OFF</p>
//                     <p className='mt-2 text-sm text-gray-600'>Save up to ${savingAmount}</p>
//                   </div>
//                   <div className='rounded-3xl border border-gray-200 bg-gray-50 p-6'>
//                     <p className='text-xs uppercase tracking-[0.25em] text-gray-500'>Price</p>
//                     <div className='mt-2 flex items-center gap-3'>
//                       <span className='text-3xl font-bold text-black'>${Number(product.price).toFixed(2)}</span>
//                       <span className='text-sm text-gray-500 line-through'>${Number(product.compareAtPrice).toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className='mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600'>No discounted product is available yet.</div>
//               )}

//               {product && !loading && !error && (
//                 <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
//                   <div className='rounded-3xl border border-gray-200 bg-gray-50 p-5'>
//                     <p className='text-xs uppercase tracking-[0.25em] text-gray-500'>Product</p>
//                     <p className='mt-3 text-xl font-semibold text-black'>{product.title}</p>
//                     {product.productType && <p className='mt-2 text-sm text-gray-600'>Category: {product.productType}</p>}
//                   </div>
//                   <button
//                     type='button'
//                     className='inline-flex items-center justify-center rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800'
//                     onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
//                   >
//                     Browse deals
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className='flex items-center justify-center'>
//               <div className='relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-100 shadow-2xl shadow-gray-200/50'>
//                 {imageUrl ? (
//                   <img
//                     src={imageUrl}
//                     alt={product?.title || 'Discounted product'}
//                     className='h-full w-full object-cover transition duration-500 hover:scale-105'
//                   />
//                 ) : (
//                   <div className='flex h-full flex-col items-center justify-center gap-3 text-center text-gray-500'>
//                     <div className='h-20 w-20 rounded-3xl bg-gray-200' />
//                     <p className='max-w-xs text-sm'>Product image not available</p>
//                   </div>
//                 )}
//                 <div className='pointer-events-none absolute bottom-6 left-6 rounded-3xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-black backdrop-blur'>
//                   {product ? `Best discount: ${discountPercent}%` : 'Discount coming soon'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default DiscountBanner




