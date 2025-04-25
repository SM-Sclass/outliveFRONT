import type { Metadata } from "next"
import ProfilePageClient from "./ProfilePageClient"

export const metadata: Metadata = {
  title: "Profile - Early",
  description: "View and edit your profile information",
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
