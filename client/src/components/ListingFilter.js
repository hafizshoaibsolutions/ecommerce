import React,{useState} from 'react'
import MobileFilterSheet from './MobileFilterSheet'
import FilterListingHeader from './FilterListingHeader'
import DesktopFilters from './DesktopFilters'

function ListingFilter({currentCategory, children}) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  return (
    <div className='bg-white '>
       <MobileFilterSheet  open={mobileFilterOpen} setOpen={setMobileFilterOpen} />
       <main className='max-w-7xl mx-auto px-4 lg:px-8 '>
        <FilterListingHeader setOpen={setMobileFilterOpen} />
          <div className='grid lg:grid-cols-4  gap-8'>
            <DesktopFilters currentCategory={currentCategory} children={children} />
          </div>
       </main>
    </div>
  )
}

export default ListingFilter