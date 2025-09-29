
'use client'
import React, { Fragment } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";

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


const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    }

]



function MenuItems({ setIsOpen }) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <nav className="mt-8 flex flex-col gap-2">
            {adminSideBarMenuItems.map(item => (
                <div key={item.id} onClick={() => {
                    router.push(item.path);
                    setIsOpen ? setIsOpen(false) : null;
                }} className={`text-xl flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${pathname === item.path ? 'bg-gray-300 text-gray-600' : 'text-gray-600 hover:bg-gray-300 hover:text-white'}`}>
                    {item.icon}
                    <span>{item.label}</span>
                </div>
            ))}
        </nav>
    )
}


function AdminSideBar({ isOpen, setIsOpen }) { 
    const router = useRouter()

    return (
        <Fragment>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="left" className="w-64 ">
                <div className="h-full flex flex-col ">
                <SheetHeader className="border-b">
                    <SheetTitle className="flex gap-2  mt-5 mb-5" >
                        <ChartNoAxesCombined size={30} />
                        <h1 className="text-2xl font-extrabold">Admin Panel</h1>


                    </SheetTitle>
                </SheetHeader>
                <MenuItems setIsOpen={setIsOpen} />
                </div>
            </SheetContent>

            </Sheet>
            <aside className="hidden fixed w-64 top-0 left-0 z-40 h-screen flex-col border-r bg-background lg:flex p-6 ">
                <div className="flex gap-2 items-center " onClick={()=>{
                    router.push("/admin/dashboard")
                }}>
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold">
                        Admin Panel
                    </h1>
                  

                </div>
                <MenuItems />
            </aside>
        </Fragment>
          

    )
 }
export default AdminSideBar









