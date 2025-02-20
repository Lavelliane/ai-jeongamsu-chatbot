'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingDots = ({ message = '' }) => {
  // Animation variants for the dots
  const dotVariants = {
    initial: {
      y: 0,
      opacity: 0.7,
    },
    animate: {
      y: [0, -6, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        repeat: Infinity,
        duration: 0.8,
      },
    },
  };

  // Staggered animation delay for each dot
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex justify-start gap-2">
      <Image
        src={'/jeonghamsu-icons/16.svg'}
        alt="message icon"
        width={36}
        height={36}
        objectFit="contain"
      />
      <div className="max-w-[70%] p-3 rounded-2xl bg-shark-700/80 border border-shark-600 text-shark-100">
        <div className="flex items-center space-x-2">
          {message && <span className="text-sm mr-2">{message}</span>}
          <motion.div
            className="flex space-x-2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map(index => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-tanhide-400 rounded-full"
                variants={dotVariants}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;
