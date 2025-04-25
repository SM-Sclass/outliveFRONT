"use client"

import { usePathname } from "next/navigation"
import { DashboardSidebarContent } from "./sidebar-content"

export function DashboardSidebar() {
  const pathname = usePathname()

  // Only show sidebar for specific sections that need submenu items
  const shouldShowSidebar =
    pathname?.includes("/dashboard/content") ||
    pathname?.includes("/dashboard/appointments") ||
    pathname?.includes("/dashboard/consultations") ||
    pathname?.includes("/dashboard/settings") ||
    pathname?.includes("/dashboard/profile")

  if (!shouldShowSidebar) {
    return null
  }

  return (
    <div className="hidden border-r border-premium-dark/10 dark:border-white/5 bg-premium-teal dark:bg-premium-tealDark md:block md:w-64">
      <div className="flex h-full flex-col">
        <DashboardSidebarContent />
      </div>
    </div>
  )
}
