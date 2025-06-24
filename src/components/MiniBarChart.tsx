
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
    <div className="flex items-end justify-between gap-2 h-16">
      {data.map((item, index) => (
        <div key={item.label} className="flex flex-col items-center flex-1">
          <div className="relative w-full bg-gray-200 rounded-t overflow-hidden">
            <motion.div
              className={`${item.color} rounded-t`}
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / item.max) * 60}px` }}
              transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-gray-600 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MiniBarChart;
