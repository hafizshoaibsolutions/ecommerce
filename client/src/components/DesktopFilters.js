import React from 'react'
import SubCategoryList from './SubCategoryList'

function DesktopFilters({currentCategory, children}) {
  return (
    <aside className=''>
      <SubCategoryList currentCategory={currentCategory} children={children} />

    </aside>
  )
}

export default DesktopFilters