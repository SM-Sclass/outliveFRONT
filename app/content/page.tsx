import type { Metadata } from "next"
import { ContentPage } from "@/components/content/content-page"

export const metadata: Metadata = {
  title: "Health Content - Outlive",
  description: "Educational resources for your health journey",
}

export default function ContentPageWrapper() {
  return <ContentPage />
}
