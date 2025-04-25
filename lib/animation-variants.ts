export const fadeIn = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 1 },
}

export const slideUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
}

export const slideIn = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: 0 },
}

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

export const pulse = {
  initial: { scale: 1 },
  animate: { scale: 1 },
}

export const shimmer = {
  hidden: { opacity: 1 },
  animate: { opacity: 1 },
}

export const scaleOnHover = {
  initial: { scale: 1 },
  hover: { scale: 1 },
  tap: { scale: 1 },
}

export const buttonPress = {
  initial: { scale: 1 },
  tap: { scale: 1 },
}

export const checkReducedMotion = (): boolean => {
  return true // Always return true to disable animations
}
