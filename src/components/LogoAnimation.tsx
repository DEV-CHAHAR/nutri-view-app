
import React from 'react';
import { motion } from 'framer-motion';
import { Apple } from 'lucide-react';

interface LogoAnimationProps {
  onComplete: () => void;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, delay: 3, ease: "easeInOut" }}
    >
      <div className="text-center relative">
        {/* Animated background circles */}
        <motion.div
          className="absolute -inset-20 opacity-20"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <div className="w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl"></div>
        </motion.div>
        
        <motion.div
          className="absolute -inset-16 opacity-15"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: -360 }}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-lg"></div>
        </motion.div>

        {/* Logo icon with enhanced animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mb-6 relative z-10"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0.7)",
                "0 0 0 10px rgba(34, 197, 94, 0)",
                "0 0 0 20px rgba(34, 197, 94, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block rounded-full p-4 bg-white"
          >
            <Apple className="w-16 h-16 text-green-600" />
          </motion.div>
        </motion.div>
        
        {/* Enhanced title animation */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          onAnimationComplete={() => setTimeout(onComplete, 1800)}
          className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
        >
          NutriBox
        </motion.h1>
        
        {/* Enhanced subtitle with typing effect */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="text-xl text-gray-600 font-medium"
        >
          Smart Food Analysis System
        </motion.p>

        {/* Loading dots animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center space-x-2 mt-8"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LogoAnimation;
