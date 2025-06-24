
import React from 'react';
import { motion } from 'framer-motion';

interface MiniBarChartProps {
  data: {
    label: string;
    value: number;
    max: number;
    color: string;
  }[];
}

const MiniBarChart: React.FC<MiniBarChartProps> = ({ data }) => {
  return (
    <div className="flex items-end justify-between gap-3 h-20 p-2">
      {data.map((item, index) => (
        <motion.div 
          key={item.label} 
          className="flex flex-col items-center flex-1 group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            <motion.div
              className={`${item.color} rounded-lg relative overflow-hidden`}
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / item.max) * 64}px` }}
              transition={{ 
                duration: 1.8, 
                delay: index * 0.3, 
                ease: "easeOut",
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                brightness: 1.1
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.3 + 1,
                  ease: "easeInOut"
                }}
              />
              
              {/* Tooltip on hover */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.value}{item.label === 'Cal' ? '' : 'g'}
              </motion.div>
            </motion.div>
          </div>
          
          <motion.span 
            className="text-xs text-gray-600 mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {item.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default MiniBarChart;
