import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: 'services' | 'whyChoose' | 'cta';
}

const AnimatedBackground = ({ variant = 'services' }: AnimatedBackgroundProps) => {
  if (variant === 'services') {
    return (
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl"></div>
      </div>
    );
  }

  if (variant === 'whyChoose') {
    return (
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-md"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>
    );
  }

  return null;
};

export default AnimatedBackground;
