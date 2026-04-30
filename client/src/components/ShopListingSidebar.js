import React from 'react'
import { Fragment } from 'react'
import {
  Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { List } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import CheckboxComponent from './Checkbox'




function SideBarItem(title, Icon) {
    return(
       <div className='w-full md:w-1/4 bg-white p-4 rounded-lg '>
            <h2 className='text-md   text-gray-500'>Category</h2>
            <div className='flex flex-col gap-2 mt-4'>
                <div className='flex items-center gap-2'>
                  
                </div>
            </div>
        </div>
    )
}

function ShopListingSidebar({isOpen, setIsOpen}) {
  return (
   <Fragment>
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className='p-2   md:hidden'>
            <List />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className='w-64'>
          <SheetHeader>
            <SheetTitle className='text-3xl font-bold text-gray-800'>Filters</SheetTitle>
          </SheetHeader>
           <SideBarItem  />
        </SheetContent>

      </Sheet>

   </Fragment>              
  )
}

export default ShopListingSidebar