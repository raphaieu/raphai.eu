# SEO & Analytics - raphai.eu

## Overview

Estratégia completa de SEO e Analytics para maximizar visibilidade e medir performance do site.

---

## Google Analytics 4

### Setup

```typescript
// app/layout.tsx
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // G-VDYG8GFRG0

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Custom Events

```typescript
// lib/analytics.ts
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Usage examples:
trackEvent('click', 'project', 'Trady.chat Demo');
trackEvent('click', 'whatsapp', 'Contact Button');
trackEvent('submit', 'contact_form', 'Hero CTA');
trackEvent('switch', 'language', 'pt-br to en-us');
```

### Eventos a Rastrear

| Evento | Action | Category | Label |
|--------|--------|----------|-------|
| Click em projeto | `click` | `project` | Nome do projeto |
| Click em demo | `click` | `demo` | URL de demo |
| Click WhatsApp | `click` | `whatsapp` | Seção de origem |
| Click Email | `click` | `email` | Seção de origem |
| Trocar idioma | `switch` | `language` | `pt-br to en-us` |
| Ler post do blog | `view` | `blog` | Título do post |
| Scroll até seção | `scroll` | `engagement` | Nome da seção |

---

## Vercel Analytics

### Setup

```bash
bun add @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights (opcional)

```bash
bun add @vercel/speed-insights
```

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Meta Tags & SEO

### Global Meta Tags (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://raphai.eu'),
  title: {
    default: 'Raphael Martins — Software Engineer & Maker',
    template: '%s | Raphael Martins',
  },
  description: 'Engenheiro de software criando ferramentas que facilitam a vida das pessoas. Especialista em Laravel, Vue.js e arquiteturas modernas.',
  keywords: [
    'Raphael Martins',
    'Software Engineer',
    'Full Stack Developer',
    'Laravel',
    'Vue.js',
    'Next.js',
    'TypeScript',
    'Trading',
    'DevOps',
  ],
  authors: [{ name: 'Raphael Martins', url: 'https://raphai.eu' }],
  creator: 'Raphael Martins',
  publisher: 'Raphael Martins',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: 'https://raphai.eu',
    siteName: 'Raphael Martins',
    title: 'Raphael Martins — Software Engineer & Maker',
    description: 'Criando ferramentas que facilitam a vida das pessoas.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raphael Martins',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raphael Martins — Software Engineer & Maker',
    description: 'Criando ferramentas que facilitam a vida das pessoas.',
    images: ['/images/og-image.jpg'],
    creator: '@raphaieu', // Se tiver Twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
```

### Page-Specific Meta Tags

```typescript
// app/[locale]/projetos/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Conheça meus projetos: Rateio Justo, DOPA Check e Trady.chat.',
  openGraph: {
    title: 'Projetos | Raphael Martins',
    description: 'Conheça meus projetos: Rateio Justo, DOPA Check e Trady.chat.',
    images: ['/images/og-projects.jpg'],
  },
};
```

### Dynamic Meta Tags (Blog)

```typescript
// app/[locale]/blog/[slug]/page.tsx
import { getBlogPostBySlug } from '@/lib/notion';
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug, params.locale);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['Raphael Martins'],
      images: post.cover ? [post.cover] : ['/images/og-blog.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : ['/images/og-blog.jpg'],
    },
  };
}
```

---

## Structured Data (JSON-LD)

### Person Schema (Home)

```typescript
// app/[locale]/page.tsx
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raphael Martins',
    url: 'https://raphai.eu',
    image: 'https://raphai.eu/images/profile.jpg',
    sameAs: [
      'https://linkedin.com/in/raphaieu',
      'https://github.com/raphaieu',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelancer',
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'The Cloud Bootcamp',
    },
    knowsAbout: [
      'Laravel',
      'Vue.js',
      'Next.js',
      'TypeScript',
      'DevOps',
      'Trading',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### BlogPosting Schema (Blog Post)

```typescript
// app/[locale]/blog/[slug]/page.tsx
export default function BlogPostPage({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.cover,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Raphael Martins',
      url: 'https://raphai.eu',
    },
    publisher: {
      '@type': 'Person',
      name: 'Raphael Martins',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://raphai.eu/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Post content */}
    </>
  );
}
```

---

## Sitemap

### Sitemap Automático (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://raphai.eu';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pt-br`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pt-br/projetos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en-us/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Blog posts (PT-BR)
  const postsPtBr = await getBlogPosts('pt-br');
  const blogPagesPtBr = postsPtBr.map(post => ({
    url: `${baseUrl}/pt-br/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog posts (EN-US)
  const postsEnUs = await getBlogPosts('en-us');
  const blogPagesEnUs = postsEnUs.map(post => ({
    url: `${baseUrl}/en-us/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPagesPtBr, ...blogPagesEnUs];
}
```

---

## Robots.txt

### Robots Automático (`app/robots.ts`)

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/private/'],
    },
    sitemap: 'https://raphai.eu/sitemap.xml',
  };
}
```

---

## Open Graph Images

### Imagens Necessárias

| Página | Dimensões | Nome do Arquivo |
|--------|-----------|-----------------|
| Home | 1200x630 | `og-image.jpg` |
| Projetos | 1200x630 | `og-projects.jpg` |
| Blog (default) | 1200x630 | `og-blog.jpg` |
| Rateio Justo | 1200x630 | `og-rateio-justo.jpg` |
| DOPA Check | 1200x630 | `og-dopa-check.jpg` |
| Trady.chat | 1200x630 | `og-trady-chat.jpg` |
| Posts (individuais) | 1200x630 | Do Notion (Cover) |

### Template OG Image

```
┌──────────────────────────────┐
│                              │
│   Raphael Martins            │
│   Software Engineer & Maker  │
│                              │
│   [Logo/Icon]                │
│                              │
│   Título da Página           │
│   Subtítulo/Descrição        │
│                              │
│   raphai.eu                  │
│                              │
└──────────────────────────────┘
```

**Ferramenta sugerida**: [Figma](https://figma.com) ou [og-image-generator](https://og-image-generator.vercel.app/)

---

## Performance Optimizations

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.0s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅

### Otimizações

```typescript
// next.config.js
module.exports = {
  // Enable Turbopack (Next.js 15)
  experimental: {
    turbo: {},
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Compression
  compress: true,
  
  // Swc minification
  swcMinify: true,
};
```

---

## Canonical URLs

### Configuração

```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({ params, children }) {
  const canonicalUrl = `https://raphai.eu/${params.locale}`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      {children}
    </>
  );
}
```

---

## Alternates (i18n)

### Configuração

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://raphai.eu',
    languages: {
      'pt-BR': 'https://raphai.eu/pt-br',
      'en-US': 'https://raphai.eu/en-us',
    },
  },
};
```

---

## Lighthouse Checklist

### Checklist para 100/100

- [ ] **Performance**
  - [ ] Imagens otimizadas (WebP/AVIF)
  - [ ] Lazy loading habilitado
  - [ ] Fonts otimizadas (font-display: swap)
  - [ ] Code splitting automático
  - [ ] Tree shaking ativo

- [ ] **Accessibility**
  - [ ] Alt text em todas imagens
  - [ ] ARIA labels quando necessário
  - [ ] Contraste adequado (WCAG AA)
  - [ ] Keyboard navigation funcional
  - [ ] Semantic HTML

- [ ] **Best Practices**
  - [ ] HTTPS ativo (Vercel automático)
  - [ ] Console sem erros
  - [ ] Secure headers configurados
  - [ ] No mixed content

- [ ] **SEO**
  - [ ] Meta tags completas
  - [ ] Sitemap.xml gerado
  - [ ] Robots.txt configurado
  - [ ] Structured data (JSON-LD)
  - [ ] Canonical URLs
  - [ ] Mobile-friendly

---

## Monitoring

### Ferramentas Recomendadas

1. **Google Search Console**
   - Indexação
   - Performance de busca
   - Mobile usability
   - Core Web Vitals

2. **Vercel Analytics**
   - Real User Monitoring
   - Speed Insights
   - Audience Analytics

3. **Google Analytics 4**
   - Traffic sources
   - User behavior
   - Conversions
   - Custom events

4. **Lighthouse CI** (opcional)
   - Performance regression testing
   - CI/CD integration

---

## Próximos Passos

1. ✅ SEO & Analytics documentado
2. 🔧 Implementar Google Analytics
3. 🔧 Implementar Vercel Analytics
4. 📝 Criar meta tags
5. 🗺️ Gerar sitemap
6. 🖼️ Criar Open Graph images
7. 🚀 Testar no Lighthouse
8. 📊 Monitorar performance
