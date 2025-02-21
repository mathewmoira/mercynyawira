import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  isLoading = false, 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-gold-gradient text-primary hover:bg-gold-gradient-hover shadow-lg hover:shadow-gold/20 hover:shadow-xl",
    secondary: "border-2 border-gold text-gold hover:bg-gold/10",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : children}
    </motion.button>
  );
} 