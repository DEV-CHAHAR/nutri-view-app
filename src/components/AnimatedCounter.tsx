
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2, 
  suffix = '', 
  decimals = 0 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Enhanced easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(value * easeOutCubic);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      className="inline-block"
    >
      <motion.span
        key={Math.floor(count)}
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        className="inline-block"
      >
        {count.toFixed(decimals)}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
