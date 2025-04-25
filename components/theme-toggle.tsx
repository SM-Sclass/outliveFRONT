"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const iconVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: 0, transition: { duration: 0.3 } },
    exit: { scale: 0.6, rotate: 90, transition: { duration: 0.3 } },
  }

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.2 } },
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={prefersReducedMotion ? {} : iconVariants}
            key={theme === "dark" ? "dark" : "light"}
          >
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-premium-cardDark dark:border-white/10" asChild>
        <motion.div
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="dark:hover:bg-premium-darkMuted dark:focus:bg-premium-darkMuted cursor-pointer"
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="dark:hover:bg-premium-darkMuted dark:focus:bg-premium-darkMuted cursor-pointer"
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="dark:hover:bg-premium-darkMuted dark:focus:bg-premium-darkMuted cursor-pointer"
          >
            <span className="mr-2 h-4 w-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </span>
            <span>System</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
