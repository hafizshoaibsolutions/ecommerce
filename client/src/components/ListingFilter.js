import React,{useState} from 'react'
import MobileFilterSheet from './MobileFilterSheet'
import FilterListingHeader from './FilterListingHeader'

function ListingFilter() {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  return (
    <div className='bg-white '>
       <MobileFilterSheet  open={mobileFilterOpen} setOpen={setMobileFilterOpen} />
       <main className='max-w-7xl mx-auto px-4 lg:px-8 '>
        <FilterListingHeader setOpen={setMobileFilterOpen} />
       </main>
    </div>
  )
}

export default ListingFilter