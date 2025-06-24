
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
    <div className="space-y-3">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="w-10 text-sm font-medium text-gray-600 dark:text-gray-400">
            {item.label}
          </div>
          <div className="flex-1 relative">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
              <motion.div
                className={`h-full ${item.color} rounded-full relative overflow-hidden`}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / item.max) * 100}%` }}
                transition={{ duration: 1.5, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ 
                  scale: 1.02,
                  filter: "brightness(1.1)" // Fixed: use filter instead of direct brightness property
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 300] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </div>
          </div>
          <div className="w-12 text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">
            {item.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MiniBarChart;
