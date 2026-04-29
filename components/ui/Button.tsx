import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 hover-lift cursor-pointer';

  const variants = {
    primary: 'text-white',
    secondary:
      'border border-gray-300 text-gray-700 hover:border-[#004e64] hover:text-[#004e64]',
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const combinedClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const primaryStyle =
    variant === 'primary'
      ? { backgroundColor: '#004e64' }
      : undefined;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      (e.currentTarget as HTMLElement).style.backgroundColor = '#0066cc';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      (e.currentTarget as HTMLElement).style.backgroundColor = '#004e64';
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        style={primaryStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      style={primaryStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
