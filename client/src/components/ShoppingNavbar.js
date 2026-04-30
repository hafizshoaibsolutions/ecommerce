"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useMemo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useCachedCategories } from "@/hooks/useCachedCategories"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBasket, Search, User, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Memoize category item component for mobile menu
const MobileCategoryItem = ({ category, onClick }) => (
  <Link 
    key={category._id}
    href={`/shopping/products?category=${category.slug}`}
    className="flex items-center gap-2 p-2 pl-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" 
    onClick={onClick}
  >
    {category.images && category.images[0] && (
      <Image 
        src={category.images[0]} 
        alt={category.name}
        width={32}
        height={32}
        className="h-8 w-8 rounded object-cover flex-shrink-0"
      />
    )}
    <span className="text-sm font-medium">{category.name}</span>
  </Link>
);

export default function ShoppingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { categories, loading: loadingCategories } = useCachedCategories()
  const cartItems = useSelector((state) => state.cart.items || [])
  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])
  const user = useSelector((state) => state.auth.user)

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }, [searchQuery])

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Memoize mobile categories rendering
  const mobileCategories = useMemo(() => {
    return categories.length > 0 ? (
      <>
        <div className="text-md font-semibold text-gray-700 p-1 pt-2">Categories</div>
        {categories.map((category) => (
          <MobileCategoryItem key={category._id} category={category} onClick={handleCloseMenu} />
        ))}
      </>
    ) : null;
  }, [categories, handleCloseMenu])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className=" container w-full  flex h-16 items-center justify-between ">
        {/* Logo */}
        <Link href="/shopping" className="flex items-center space-x-2 px-5">
          <ShoppingBasket className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-gray-900">ECommerce</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/shopping" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/shopping/products"
                      >
                        <ShoppingBasket className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          All Products
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Browse our complete collection of products.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {loadingCategories ? (
                    <li>
                      <div className="text-sm text-muted-foreground p-3">Loading categories...</div>
                    </li>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category._id}>
                        <NavigationMenuLink asChild>
                          <Link href={`/products?category=${category._id}`} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="flex items-start gap-3">
                              {category.images && category.images[0] && (
                                <Image 
                                  src={category.images[0]} 
                                  alt={category.name}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                <p className="line-clamp-1 text-xs leading-snug text-muted-foreground mt-1">
                                  {category.name} collection
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="text-sm text-muted-foreground p-3">No categories available</div>
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/shopping/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/shopping/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/shopping/cart">
              <ShoppingBasket className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          {/* User Account */}
          <Button variant="ghost" size="icon" asChild>
            <Link href={user ? "/shopping/account" : "/auth/login"}>
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/shopping" className="text-lg font-medium p-1" onClick={handleCloseMenu}>
                  Home
                </Link>
                <Link href="/shopping/products" className="text-lg font-medium p-1" onClick={handleCloseMenu}>
                  All Products
                </Link>
                {loadingCategories ? (
                  <div className="text-sm text-muted-foreground p-1">Loading categories...</div>
                ) : mobileCategories}
                <Link href="/shopping/about" className="text-lg font-medium p-1" onClick={handleCloseMenu}>
                  About
                </Link>
                <Link href="/shopping/contact" className="text-lg font-medium p-1" onClick={handleCloseMenu}>
                  Contact
                </Link>
                <form onSubmit={handleSearch} className="mt-4 p-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}