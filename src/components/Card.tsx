import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      className={`bg-black rounded-lg border border-gold/20 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(251, 191, 36, 0.2)"
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
} 