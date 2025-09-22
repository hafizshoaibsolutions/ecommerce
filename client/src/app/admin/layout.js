'use client'
import React, {useState} from 'react'
import AdminSideBar from '@/components/AdminSideBar';
import AdminNavbar from '@/components/AdminNavbar';

function AdminLayout({children}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
      

        <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
  
        <div className='flex-1 flex flex-col lg:ml-64'>
            <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <main className='bg-gray-50 p-4 md:p-6'>
                {children}
            </main>
        </div>
    </div>
  )
}

export default AdminLayout