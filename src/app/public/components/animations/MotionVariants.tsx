// Animation variants for consistent motion across components
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay: 0.2 },
  viewport: { once: true }
};

export const staggerContainer = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  whileHover: { y: -15, scale: 1.02 },
  viewport: { once: true, amount: 0.2 },
  transition: { 
    duration: 0.7, 
    type: "spring",
    stiffness: 100
  }
};

export const cardHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const underlineAnimation = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  transition: { duration: 1.2, delay: 1 },
  viewport: { once: true }
};
