'use client'
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { use } from "react"







export default function ShopListingBreadCrumb({ items, breadCrumb }) {
  // Support both prop names for flexibility
  const breadcrumbItems = items || breadCrumb || []

  // Handle empty breadcrumb
  if (!breadcrumbItems || breadcrumbItems.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1 

          const href = item.href || `/products?category=${item._id}`

         return (
          <BreadcrumbItem key={item._id}>
            
           {!isLast?(
            <BreadcrumbLink asChild>
              <Link href={href}>{item.name}</Link>     
            </BreadcrumbLink>
           ):(
             <span className="text-muted-foreground">
               {item.name}
             </span>
           )} 
           {
            !isLast && <BreadcrumbSeparator/> 
           }
            
          </BreadcrumbItem>
         )


        }) }

       

      </BreadcrumbList>
    </Breadcrumb>
  )
}
