'use client'
import React, {useState} from 'react'
import AdminSideBar from '@/components/AdminSideBar';
import AdminNavbar from '@/components/AdminNavbar';

function AdminLayout({children}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex min-h-screen w-full '>
      

        <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
  
        <div className='flex-1 flex flex-col '>
            <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <main className='flex-1 flex-col flex p-4 md:p-6 lg:ml-64 lg:mt-14 mt-14 '>
                {children}
            </main>
        </div>
    </div>
  )
}

export default AdminLayout