'use client'
import React from 'react'
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname, useRouter } from 'next/navigation'
import { CgClose } from "react-icons/cg";
import { adminSideBarMenuItems } from '@/constants/constant'

function MenuItems() {
    const router = useRouter()
    const pathname = usePathname()

  return (
        <nav className="mt-8 flex flex-col gap-2">
           
                {adminSideBarMenuItems.map(item => (
                    <div key={item.id} onClick={()=>{
                        router.push(item.path)
                    }} className={`text-xl flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                      {item.label}
                    </div>
                ))}
        </nav>
  )
}

function AdminSideBar({isOpen, setIsOpen}) {
    const router = useRouter()
    return(
        <>
        {
            isOpen && (
                <div className='fixed inset-0 z-40 transition-opacity duration-300' onClick={() => setIsOpen(!isOpen)} />
            )
        }

        <div className={`fixed top-0 left-0 h-screen z-50 w-64 bg-slate-800 text-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div>   
             <div className='flex items-center justify-between gap-2 px-2 py-3 border-b border-gray-700'>
                <SiGoogleanalytics size={25} className='text-white'  />
                <h2 className='text-xl font-extrabold'>Admin Panel</h2>
            <div className='flex-1 flex items-center justify-end '>
             <CgClose size={30} className='text-white rounded-full hover:bg-slate-600 p-1 cursor-pointer transition-all duration-300' onClick={() => setIsOpen(!isOpen)} />
             </div>
             </div>
             

            </div>
             <MenuItems />
        </div>

        <aside className='hidden lg:block w-64 fixed left-0 top-0 h-screen bg-slate-800 flex-col p-6 border-r     '>
            <div onClick={()=>{router.push('/admin/dashboard')}} className='cursor-pointer flex items-center gap-3'>
              <SiGoogleanalytics size={30} className='text-white'  />
              <h2 className='text-2xl font-extrabold text-white'>Admin Panel</h2>
            </div>
            <MenuItems />
        </aside>

        </>
    )
}


export default AdminSideBar