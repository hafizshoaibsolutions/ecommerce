import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

function AdminNavbar({isOpen, setIsOpen}) {
  return (
    <header className='flex justify-between items-center fixed top-0 left-0 right-0 p-4 border-b bg-slate-700  z-10 lg:left-64 '>
      <button className='lg:hidden sm:block py-2 px-2  me-1 mb-1 text-sm font-medium text-gray-200 bg-slate-700 hover:bg-slate-600 hover:text-white border border-slate-500 rounded-md  transition-all focus:outline-none focus:ring-2 focus:ring-slate-500' onClick={() => setIsOpen(true)}>
        <RxHamburgerMenu size={25}/>
      </button>
      <div className='flex-1 justify-end flex items-center gap-4'>
         hello world how are you what are you doing
      </div>

    </header>
    
   
  )
}

export default AdminNavbar