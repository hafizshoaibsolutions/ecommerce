import React from 'react'
import SubCategoryList from './SubCategoryList'

function DesktopFilters({currentCategory, children, siblings }) {
  return (
    <aside className='flex-col gap-6 hidden lg:block'>
      <SubCategoryList currentCategory={currentCategory} children={children} siblings={siblings} />

    </aside>
  )
}

export default DesktopFilters