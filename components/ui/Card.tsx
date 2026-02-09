import React from 'react';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  className = '',
}: CardProps) {
  const baseClasses = 'bg-white rounded-2xl p-8 shadow-sm';
  const hoverClasses = hover
    ? 'project-card'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
