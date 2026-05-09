import React from 'react'
import { ListFilterPlus } from 'lucide-react'

function FilterListingHeader({setOpen}) {
  return (
    <div className='flex items-center justify-between py-4 border-b '>
        <h1 className='text-3xl font-bold'>Products</h1>
        <div className='flex gap-3'>
            <button onClick={()=>setOpen(true)} className='flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors py-2 px-3 lg:hidden'>
              <ListFilterPlus />
            </button>
            
            
        </div>
        
    </div>
  )
}

export default FilterListingHeader