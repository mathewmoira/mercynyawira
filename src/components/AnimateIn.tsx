import React from 'react';
import { useInView } from '../hooks/useInView';

type AnimationType = 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in';

interface AnimateInProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function AnimateIn({ 
  children, 
  type = 'fade-in', 
  delay = 0,
  className = '',
  threshold = 0.1,
  rootMargin = '-50px'
}: AnimateInProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin });

  return (
    <div 
      ref={ref}
      className={`${isInView ? `animate-${type}` : ''} ${delay ? `delay-${delay}` : ''} ${className}`}
      style={{ opacity: isInView ? undefined : 0, transform: isInView ? undefined : 'translateY(20px)' }}
    >
      {children}
    </div>
  );
}

export function AnimateInStagger({ 
  children, 
  type = 'fade-in',
  className = '',
  threshold = 0.1,
  rootMargin = '-50px'
}: Omit<AnimateInProps, 'delay'>) {
  const { ref, isInView } = useInView({ threshold, rootMargin });

  return (
    <div 
      ref={ref}
      className={`${isInView ? 'stagger-children' : ''} ${className}`}
      style={{ opacity: isInView ? undefined : 0 }}
    >
      {React.Children.map(children, (child) => (
        <div className={isInView ? `animate-${type}` : ''}>
          {child}
        </div>
      ))}
    </div>
  );
} 