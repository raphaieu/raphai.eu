import React from 'react';

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  target?: string;
  rel?: string;
  className?: string;
}

export default function LinkButton({
  children,
  href,
  variant = 'primary',
  target,
  rel,
  className = '',
}: LinkButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-300';

  const variantClasses = {
    primary:
      'bg-[#004e64] text-white hover:bg-[#0066cc]',
    secondary:
      'border border-gray-300 text-gray-700 hover:border-[#004e64] hover:text-[#004e64]',
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
