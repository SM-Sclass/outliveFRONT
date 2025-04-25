"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function ContentCategories() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new content page
    router.push("/content")
  }, [router])

  return null
}
