"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Pill,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Appointments", href: "/dashboard/book-appointment", icon: Calendar },
    { name: "Content", href: "/dashboard/content", icon: FileText },
    { name: "Prescriptions", href: "/dashboard/prescriptions", icon: Pill },
    { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Referrals", href: "/dashboard/referrals", icon: Users },
  ]

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const searchVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "100%", transition: { duration: 0.3 } },
    exit: { opacity: 0, width: 0, transition: { duration: 0.2 } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-premium-dark dark:bg-premium-backgroundDark border-b border-transparent dark:border-white/5">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-[var(--content-max-width)]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-premium-dark/50 dark:hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/dashboard" className="flex items-center gap-3">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-premium-primary dark:bg-premium-primaryDark"
              whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </motion.div>
            <motion.span
              className="text-xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Outlive
            </motion.span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-2">
          {navigation.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial={prefersReducedMotion ? "visible" : "hidden"}
              animate="visible"
              variants={navItemVariants}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "text-white bg-premium-primary/20 dark:bg-premium-primary/30"
                    : "text-gray-300 hover:text-white hover:bg-premium-primary/10 dark:hover:bg-premium-primary/20"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isSearchOpen ? (
              <motion.div
                className="relative"
                key="search-open"
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                exit="exit"
                variants={searchVariants}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border-0 bg-premium-dark/90 dark:bg-premium-darkMuted py-2 pl-10 pr-8 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-premium-primary dark:focus:ring-premium-secondary"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div key="search-closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center bg-premium-primary dark:bg-premium-secondary text-[10px] text-white">
                3
              </Badge>
            </Button>
          </motion.div>

          <ThemeToggle />

          <div className="hidden md:block">
            <Link href="/dashboard/profile">
              <motion.div
                className="flex items-center gap-2"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="h-9 w-9 border-2 border-premium-primary/20 dark:border-premium-secondary/20">
                  <AvatarImage src="/confident-female-doctor.png" alt="User" />
                  <AvatarFallback className="bg-premium-primary text-white dark:bg-premium-secondary">
                    JD
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-premium-dark/20 dark:border-white/10 bg-premium-dark/95 dark:bg-premium-backgroundDark/95 backdrop-blur-sm overflow-hidden"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="space-y-1 px-4 py-3">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium ${
                      pathname === item.href || pathname?.startsWith(item.href + "/")
                        ? "bg-premium-primary text-white"
                        : "text-gray-300 hover:bg-premium-primary/10 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-300 hover:bg-premium-primary/10 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              </motion.div>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navigation.length + 1) * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-300 hover:bg-premium-primary/10 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
