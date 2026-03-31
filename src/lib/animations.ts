export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
}

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(232,102,255,0.2)',
      '0 0 25px rgba(232,102,255,0.5)',
      '0 0 10px rgba(232,102,255,0.2)',
    ],
    transition: { duration: 2.5, repeat: Infinity }
  }
}
