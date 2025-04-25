"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, User, Heart, Activity, Brain, Weight, Bell, Settings, Lock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DashboardSidebarContent() {
  const pathname = usePathname()

  // Define submenu items for different sections
  const contentSubmenu = [
    { name: "All Content", href: "/dashboard/content", icon: FileText, title: "All Content" },
    { name: "Blog", href: "/dashboard/content/blog", icon: FileText, title: "Blog" },
    { name: "Fitness", href: "/dashboard/content?category=fitness", icon: Activity, title: "Fitness" },
    { name: "Mental Health", href: "/dashboard/content?category=mental-health", icon: Brain, title: "Mental Health" },
    {
      name: "Weight Management",
      href: "/dashboard/content?category=weight-management",
      icon: Weight,
      title: "Weight Management",
    },
  ]

  const appointmentsSubmenu = [
    { name: "Upcoming Appointments", href: "/dashboard/appointments", icon: Calendar, title: "Upcoming Appointments" },
    { name: "Book Appointment", href: "/dashboard/book-appointment", icon: Calendar, title: "Book Appointment" },
    { name: "Past Appointments", href: "/dashboard/appointments?tab=past", icon: Calendar, title: "Past Appointments" },
  ]

  const profileSubmenu = [
    { name: "Personal Info", href: "/dashboard/profile?tab=personal", icon: User, title: "Personal Info" },
    { name: "Health Assessment", href: "/dashboard/profile?tab=assessment", icon: Heart, title: "Health Assessment" },
    { name: "Preferences", href: "/dashboard/profile?tab=preferences", icon: User, title: "Preferences" },
  ]

  const settingsSubmenu = [
    { name: "Notification Preferences", href: "/dashboard/settings", icon: Bell, title: "Notification Preferences" },
    { name: "Account Settings", href: "/dashboard/settings?tab=account", icon: Settings, title: "Account Settings" },
    { name: "Privacy", href: "/dashboard/settings?tab=privacy", icon: Lock, title: "Privacy" },
  ]

  // Determine which submenu to show based on the current path
  let submenuItems = []
  let sectionTitle = ""

  if (pathname?.includes("/dashboard/content")) {
    submenuItems = contentSubmenu
    sectionTitle = "Content Library"
  } else if (pathname?.includes("/dashboard/appointments") || pathname?.includes("/dashboard/book-appointment")) {
    submenuItems = appointmentsSubmenu
    sectionTitle = "Appointments"
  } else if (pathname?.includes("/dashboard/profile")) {
    submenuItems = profileSubmenu
    sectionTitle = "Profile Settings"
  } else if (pathname?.includes("/dashboard/settings")) {
    submenuItems = settingsSubmenu
    sectionTitle = "Settings"
  }

  return (
    <ScrollArea className="h-full py-6">
      <div className="px-4 py-2">
        <h2 className="mb-6 px-2 text-lg font-semibold text-gray-800 dark:text-white">{sectionTitle}</h2>
        <nav className="space-y-1.5">
          {submenuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors relative ${
                  isActive
                    ? "bg-white text-outlive-green-600 shadow-sm border border-outlive-green-200 dark:text-black"
                    : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-outlive-green-500"
                }`}
              >
                {item.icon && (
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-outlive-green-500" : "text-gray-500"}`} />
                )}
                <span>{item.title}</span>
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-outlive-green-500 rounded-l-md"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </ScrollArea>
  )
}
