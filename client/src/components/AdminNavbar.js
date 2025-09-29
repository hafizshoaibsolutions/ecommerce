import React from 'react'
import { Menu } from 'lucide-react';

function AdminNavbar({isOpen, setIsOpen}) {
  return (
    <header className='fixed top-0 h-14  text-white flex items-center justify-between px-4 border-b z-40
        w-full lg:w-[calc(100%-15rem)] lg:ml-64'>
      <button className='lg:hidden sm:block py-2 px-2  me-1 mb-1 text-sm font-medium  bg-slate-700 hover:bg-slate-600 hover:text-white border border-slate-500 rounded-md  transition-all focus:outline-none focus:ring-2 focus:ring-slate-500' onClick={() => setIsOpen(true)}>
        <Menu size={20} />
      </button>
      <div className='flex-1 justify-end flex items-center gap-4'>
         hello world how are you what are you doing
      </div>

    </header>
    
   
  )
}

export default AdminNavbar