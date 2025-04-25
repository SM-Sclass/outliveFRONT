import type { Metadata } from "next"
import { DashboardContentPage } from "@/components/dashboard/content/dashboard-content-page"

export const metadata: Metadata = {
  title: "Content - Early",
  description: "Health and wellness resources",
}

export default function ContentPage() {
  return <DashboardContentPage />
}
