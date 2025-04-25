"use client"

import type React from "react"

interface AnimatedPageTransitionProps {
  children: React.ReactNode
}

export function AnimatedPageTransition({ children }: AnimatedPageTransitionProps) {
  // Simply return children without animation
  return <>{children}</>
}
