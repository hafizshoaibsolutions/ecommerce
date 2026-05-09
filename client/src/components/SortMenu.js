import React from 'react'
import {Button} from '@/components/ui/button'
import { ChevronRightIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

} from '@/components/ui/dropdown-menu'

function SortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Sort
          <ChevronRightIcon className=" h-2 w-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Newest</DropdownMenuItem>
        <DropdownMenuItem>Customer Rating</DropdownMenuItem>
        <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
        <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortMenu