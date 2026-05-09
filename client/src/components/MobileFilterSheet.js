import React from 'react'
import { 
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle
 } from './ui/sheet'

function MobileFilterSheet({open,setOpen}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='left' className='w-[300px] p-4'>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className='mt-4'>
          {/* Your filter content goes here */}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilterSheet