# SEO Final - Checklist de Implementação

## ✅ Já Implementado

### 1. **Meta Tags Básicas** (`app/[locale]/layout.tsx`)
- ✅ `title` (default + template)
- ✅ `description`
- ✅ `keywords`
- ✅ `authors`, `creator`, `publisher`
- ✅ `formatDetection` (email, address, telephone)
- ✅ `robots` (index, follow, googleBot)
- ✅ `icons` (favicon, shortcut, apple)

### 2. **Open Graph** (Facebook, LinkedIn, WhatsApp)
- ✅ `type: website`
- ✅ `locale: pt_BR` + `alternateLocale: en_US`
- ✅ `url`, `siteName`, `title`, `description`
- ⚠️ `images` (placeholder `/images/og-image.jpg`)

### 3. **Twitter Card**
- ✅ `card: summary_large_image`
- ✅ `title`, `description`
- ⚠️ `images` (placeholder `/images/og-image.jpg`)

### 4. **Google Fonts** (Otimizado)
- ✅ `display: 'swap'` para evitar FOIT
- ✅ Preload automático via Next.js
- ✅ Subsets: `['latin']`

## 🚧 Pendente de Implementação

### 1. **Google Analytics 4** (ID: G-VDYG8GFRG0)

**Onde adicionar:** `app/[locale]/layout.tsx`

```typescript
import Script from 'next/script';

// Dentro do <body>, antes de </body>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-VDYG8GFRG0`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VDYG8GFRG0', {
      page_path: window.location.pathname,
    });
  `}
</Script>
```

**Custom Events:**
- `view_project` - Quando usuário clica em "Ver demo"
- `download_cv` - Quando baixa o CV
- `whatsapp_click` - Clique no botão WhatsApp
- `email_click` - Clique no email
- `linkedin_click` - Clique no LinkedIn

### 2. **Vercel Analytics**

**Instalar:**
```bash
bun add @vercel/analytics
```

**Adicionar em** `app/[locale]/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Dentro do <body>, antes de </body>
<Analytics />
```

### 3. **Sitemap** (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://raphai.eu';
  
  return [
    {
      url: `${baseUrl}/pt-br`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-br`,
          'en-US': `${baseUrl}/en-us`,
        },
      },
    },
    // Adicionar páginas do blog quando implementar
  ];
}
```

### 4. **Robots.txt** (`app/robots.ts`)

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://raphai.eu/sitemap.xml',
  };
}
```

### 5. **Open Graph Images**

**Criar:**
- `/public/images/og-image.jpg` (1200x630px)
- `/public/images/og-image-en.jpg` (versão em inglês, opcional)

**Otimizado:**
- Formato: JPG ou PNG
- Tamanho: 1200x630px (obrigatório)
- Peso: < 300KB
- Conteúdo: Nome, slogan, foto

**Ferramentas:**
- [Canva](https://www.canva.com/) - Templates prontos
- [OG Image Generator](https://og-image.vercel.app/)
- Figma / Photoshop

**Exemplo de conteúdo:**
```
┌─────────────────────────────────────────┐
│                                         │
│  Raphael Martins                        │
│  Software Engineer & Maker              │
│                                         │
│  "I enjoy creating tools that make      │
│   life easier for people."              │
│                                         │
│  [Foto]                                 │
│                                         │
│  raphai.eu                              │
└─────────────────────────────────────────┘
```

### 6. **JSON-LD Structured Data**

**Adicionar em** `app/[locale]/layout.tsx`:

```typescript
<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Raphael Martins',
      url: 'https://raphai.eu',
      image: 'https://raphai.eu/images/raphaieu.jpeg',
      sameAs: [
        'https://linkedin.com/in/raphaieu',
        'https://github.com/raphaieu',
      ],
      jobTitle: 'Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelancer',
      },
      alumniOf: 'The Cloud Bootcamp',
      knowsAbout: [
        'PHP',
        'Laravel',
        'Vue.js',
        'TypeScript',
        'Next.js',
        'AWS',
        'Docker',
      ],
    }),
  }}
/>
```

### 7. **Hreflang (i18n SEO)**

**Adicionar em** `app/[locale]/layout.tsx`:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    // ... existing metadata
    alternates: {
      canonical: `https://raphai.eu/${locale}`,
      languages: {
        'pt-BR': 'https://raphai.eu/pt-br',
        'en-US': 'https://raphai.eu/en-us',
      },
    },
  };
}
```

### 8. **Performance Optimizations**

#### Images
- ✅ Next.js Image component (já implementado)
- ⚠️ Converter para WebP (quando adicionar screenshots)
- ⚠️ Lazy loading automático

#### CSS
- ✅ Tailwind CSS otimizado
- ✅ Purge automático de classes não usadas

#### Fonts
- ✅ Google Fonts otimizado com `display: swap`
- ✅ Preload automático

#### JavaScript
- ✅ Code splitting automático (Next.js)
- ✅ Tree shaking

## 📊 Ferramentas de Validação

### SEO
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Meta Tags Validator](https://metatags.io/)

### Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Acessibilidade
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Open Graph
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## ✅ Checklist Final (Antes do Deploy)

### Meta Tags
- [ ] Verificar `og:image` existe e é válido
- [ ] Validar Twitter Card
- [ ] Testar preview no Facebook/LinkedIn/WhatsApp

### Analytics
- [ ] Google Analytics instalado
- [ ] Vercel Analytics instalado
- [ ] Custom events configurados

### SEO Técnico
- [ ] Sitemap gerado (`/sitemap.xml`)
- [ ] Robots.txt configurado (`/robots.txt`)
- [ ] JSON-LD implementado
- [ ] Hreflang configurado (pt-br/en-us)

### Performance
- [ ] Score Lighthouse > 90
- [ ] Imagens otimizadas (WebP)
- [ ] Fonts carregando corretamente

### Validação
- [ ] Testar no Google Rich Results Test
- [ ] Validar estrutura no Meta Tags
- [ ] Verificar mobile-friendly

## 🎯 Metas de Performance

### Lighthouse Scores (Objetivo)
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: 100

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 📚 Referências

- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
