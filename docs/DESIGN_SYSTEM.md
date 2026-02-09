# Design System - raphai.eu

## Overview

Sistema de design baseado no template premium, adaptado para Next.js + Tailwind CSS.

---

## Paleta de Cores

### Primary Colors

```css
--primary: #004e64        /* Azul escuro principal */
--primary-light: #0066cc  /* Azul claro (hover, accent) */
```

### Grayscale

```css
--gray-50: #fafafa
--gray-100: #f5f5f5      /* Backgrounds */
--gray-200: #e5e5e5      /* Borders */
--gray-300: #d4d4d4
--gray-400: #a3a3a3
--gray-500: #737373      /* Secondary text */
--gray-600: #525252
--gray-700: #404040
--gray-800: #262626      /* Primary text */
--gray-900: #171717      /* Headings */
```

### Usage

| Elemento | Cor | Uso |
|----------|-----|-----|
| Headings | `gray-900` | Títulos principais |
| Body text | `gray-700` | Texto de corpo |
| Secondary text | `gray-500` | Descrições, labels |
| Backgrounds | `gray-50`, `gray-100` | Seções alternadas |
| Borders | `gray-200` | Cards, dividers |
| Primary buttons | `primary` | CTAs principais |
| Links hover | `primary-light` | Hover states |

---

## Tipografia

### Font Families

```typescript
// app/layout.tsx
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
```

### Typography Scale

| Elemento | Class | Font | Size | Weight | Line Height |
|----------|-------|------|------|--------|-------------|
| H1 | `text-5xl sm:text-6xl lg:text-7xl` | Space Grotesk | 48-72px | 700 | tight |
| H2 | `text-4xl sm:text-5xl` | Space Grotesk | 36-48px | 700 | tight |
| H3 | `text-2xl sm:text-3xl` | Space Grotesk | 24-30px | 700 | tight |
| H4 | `text-xl sm:text-2xl` | Space Grotesk | 20-24px | 600 | tight |
| Body Large | `text-xl` | Inter | 20px | 400 | relaxed |
| Body | `text-base` | Inter | 16px | 400 | relaxed |
| Body Small | `text-sm` | Inter | 14px | 400 | normal |
| Caption | `text-xs` | Inter | 12px | 400 | normal |

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004e64',
          light: '#0066cc',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

---

## Componentes

### Button

#### Primary Button

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  size = 'md'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 hover:-translate-y-1';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'border border-gray-300 text-gray-700 hover:border-primary hover:text-primary',
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };
  
  const className = `${baseClasses} ${variants[variant]} ${sizes[size]}`;
  
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
```

**Usage**:
```tsx
<Button variant="primary" size="md" href="#contact">
  Vamos conversar
</Button>

<Button variant="secondary" onClick={handleClick}>
  Saiba mais
</Button>
```

### Card

```tsx
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = false, className = '' }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl p-8 shadow-sm';
  const hoverClasses = hover 
    ? 'transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:border-primary border border-transparent' 
    : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
```

### Badge

```tsx
// components/ui/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-100 text-green-700',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
```

---

## Animações

### Keyframes

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes slideUp {
    0% { 
      opacity: 0;
      transform: translateY(30px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    0% { 
      opacity: 0;
      transform: translateX(-30px);
    }
    100% { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    0% { 
      opacity: 0;
      transform: translateX(30px);
    }
    100% { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  
  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }
}
```

### Scroll Reveal

```tsx
// components/ui/ScrollReveal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  threshold = 0.1,
  className = ''
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Usage**:
```tsx
<ScrollReveal>
  <h2>Título que aparece ao scrollar</h2>
</ScrollReveal>
```

---

## Efeitos Especiais

### Text Gradient

```css
/* styles/globals.css */
.text-gradient {
  background: linear-gradient(135deg, #004e64 0%, #0066cc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Usage**:
```tsx
<h1 className="text-gradient font-display text-6xl">
  Raphael Martins
</h1>
```

### Glass Effect

```css
.glass-effect {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.8);
}
```

**Usage** (Header):
```tsx
<header className="glass-effect border-b border-gray-100">
  {/* Navigation */}
</header>
```

### Hover Lift

```css
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

---

## Layout

### Container

```tsx
// Max-width container
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Wide container (projetos)
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Narrow container (blog posts)
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Grid

```tsx
// 2 columns
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Items */}
</div>

// 3 columns (projetos)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

### Spacing

| Element | Top | Bottom |
|---------|-----|--------|
| Sections | `py-24` | `py-24` |
| Headings (section) | - | `mb-12` |
| Paragraphs | - | `mb-8` |
| Cards | `p-8` | - |

---

## Responsive Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Mobile-First Approach

```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row gap-8">
  {/* Items */}
</div>

// 1 col mobile, 2 cols tablet, 3 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

---

## Icons

### Heroicons (Recomendado)

```bash
bun add @heroicons/react
```

```tsx
import { EnvelopeIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

<Button>
  <EnvelopeIcon className="w-5 h-5 mr-2" />
  Email
</Button>
```

### Custom SVG Icons

```tsx
// components/icons/WhatsAppIcon.tsx
export default function WhatsAppIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
```

---

## Accessibility

### Focus States

```css
/* styles/globals.css */
@layer base {
  *:focus {
    @apply outline-none ring-2 ring-primary ring-offset-2;
  }
}
```

### ARIA Labels

```tsx
// Always add aria-label for icon-only buttons
<button aria-label="Abrir menu" className="md:hidden">
  <MenuIcon className="w-6 h-6" />
</button>

<a href="#" aria-label="LinkedIn profile">
  <LinkedInIcon />
</a>
```

---

## Dark Mode (Futuro)

Se decidir adicionar dark mode no futuro:

```typescript
// tailwind.config.ts
darkMode: 'class',

// Usage:
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

---

## Próximos Passos

1. ✅ Design system documentado
2. 🎨 Implementar componentes base
3. 🔧 Configurar Tailwind
4. ✨ Adicionar animações
5. 📱 Testar responsividade
6. ♿ Validar acessibilidade
