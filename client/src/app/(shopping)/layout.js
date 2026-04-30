

import React from 'react'
import ShoppingNavbar from '@/components/ShoppingNavbar';

function shoppinglayout({children}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <ShoppingNavbar />
      <main className='flex-1'>
        {children}
      </main>
    </div>
  )
}

export default shoppinglayout