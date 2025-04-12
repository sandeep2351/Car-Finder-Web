"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { ModeToggle } from "./mode-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"
import UserNav from "./user-nav"
import { useAuth } from "@/context/auth-context"
import { motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { wishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Browse Cars", path: "/cars" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                RideHub
              </motion.span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative group",
                    pathname === item.path ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full"
                    transition={{ duration: 0.3 }}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/wishlist">
                <Button variant="outline" size="icon" className="relative">
                  <Heart className={wishlist.length > 0 ? "fill-red-500 stroke-red-500" : ""} size={18} />
                  {wishlist.length > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </Button>
              </Link>
            </motion.div>

            <div className="hidden md:block">
              {isAuthenticated ? (
                <UserNav />
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => router.push("/login")}>Sign In</Button>
                </motion.div>
              )}
            </div>

            <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  RideHub
                </span>
              </Link>

              <Button variant="outline" size="icon" onClick={toggleMenu}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
          </div>

          <motion.nav
            className="container mx-auto px-4 py-6 space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={cn(
                    "block text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.path ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="pt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/profile" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start">
                      Profile
                    </Button>
                  </Link>
                  <Link href="/wishlist" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start">
                      Wishlist
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/login" onClick={toggleMenu}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </motion.header>
  )
}
