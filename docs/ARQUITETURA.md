# Arquitetura - raphai.eu

## Overview

Site estático com geração incremental (ISR) para o blog, hospedado na Vercel com CDN global.

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│  Vercel Edge    │ ← CDN Global
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│   Next.js App   │ ← Static + ISR
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│   Notion API    │ ← Blog Content
└─────────────────┘
```

---

## Estrutura de Diretórios

```
raphai.eu/
├── app/                              # Next.js App Router
│   ├── [locale]/                     # Rotas internacionalizadas
│   │   ├── layout.tsx               # Layout principal com i18n
│   │   ├── page.tsx                 # Home / BIO
│   │   ├── projetos/                # Showcase de projetos
│   │   │   ├── page.tsx            # Lista de projetos
│   │   │   └── [slug]/             # Projeto individual
│   │   │       └── page.tsx
│   │   └── blog/                    # Blog (Notion)
│   │       ├── page.tsx            # Lista de posts
│   │       └── [slug]/             # Post individual
│   │           └── page.tsx
│   ├── api/                         # Serverless Functions
│   │   └── notion/                  # Notion API routes (se necessário)
│   ├── layout.tsx                   # Root layout
│   ├── sitemap.ts                   # Sitemap automático
│   └── robots.ts                    # Robots.txt
│
├── components/                       # React Components
│   ├── layout/
│   │   ├── Header.tsx               # Navegação + Language Switcher
│   │   ├── Footer.tsx               # Footer com links sociais
│   │   └── WhatsAppButton.tsx       # Botão fixo WhatsApp
│   ├── home/
│   │   ├── Hero.tsx                 # Seção hero
│   │   ├── About.tsx                # Seção sobre
│   │   ├── Manifesto.tsx            # Seção manifesto
│   │   └── Contact.tsx              # Seção contato
│   ├── projects/
│   │   ├── ProjectCard.tsx          # Card de projeto
│   │   ├── ProjectGallery.tsx       # Galeria de screenshots
│   │   └── TechStack.tsx            # Badges de tecnologias
│   ├── blog/
│   │   ├── PostCard.tsx             # Card de post
│   │   ├── PostList.tsx             # Lista de posts
│   │   └── NotionRenderer.tsx       # Renderiza blocos do Notion
│   └── ui/
│       ├── Button.tsx               # Botão reutilizável
│       ├── Badge.tsx                # Badge reutilizável
│       └── Card.tsx                 # Card reutilizável
│
├── content/                          # Conteúdo estático
│   └── projects/                     # MDX dos projetos
│       ├── rateio-justo.mdx
│       ├── dopa-check.mdx
│       └── trady-chat.mdx
│
├── lib/                              # Utilities & Helpers
│   ├── notion.ts                    # Notion API client
│   ├── utils.ts                     # Utility functions
│   └── constants.ts                 # Constantes globais
│
├── messages/                         # Traduções i18n
│   ├── pt-br.json                   # Português
│   └── en-us.json                   # Inglês
│
├── public/                           # Assets estáticos
│   ├── images/
│   │   ├── profile.jpg              # Foto perfil
│   │   ├── og-image.jpg             # Open Graph default
│   │   └── projects/                # Screenshots de projetos
│   │       ├── rateio-justo/
│   │       ├── dopa-check/
│   │       └── trady-chat/
│   ├── favicon.ico
│   ├── robots.txt                   # (gerado automaticamente)
│   └── sitemap.xml                  # (gerado automaticamente)
│
├── styles/
│   └── globals.css                  # Tailwind imports + custom styles
│
├── types/                            # TypeScript types
│   ├── notion.ts                    # Types para Notion API
│   └── project.ts                   # Types para projetos
│
├── docs/                             # Documentação do projeto
│   ├── STACK_TECNICA.md
│   ├── ARQUITETURA.md               # Este arquivo
│   ├── CONTEUDO.md
│   ├── PROJETOS.md
│   ├── NOTION_SETUP.md
│   ├── SEO_ANALYTICS.md
│   ├── DESIGN_SYSTEM.md
│   └── ROADMAP.md
│
├── .env.local                        # Variáveis de ambiente (não commitado)
├── .env.example                      # Template de variáveis
├── next.config.js                    # Configuração Next.js
├── tailwind.config.ts                # Configuração Tailwind
├── tsconfig.json                     # Configuração TypeScript
├── package.json                      # Dependências
└── README.md                         # Documentação principal
```

---

## Fluxo de Dados

### 1. Páginas Estáticas (Home, Projetos)

```
Build Time:
  MDX Files → Next.js → Static HTML → Vercel CDN

Request:
  User → Vercel Edge → Cached HTML (instantâneo)
```

**Performance**: ~50ms (TTFB)

### 2. Blog (Notion → Next.js)

```
Build Time:
  Notion API → Fetch Posts → Generate Static Pages → Vercel CDN

Request:
  User → Vercel Edge → Cached HTML (revalidate a cada 60min)

Revalidation (ISR):
  Timer (60min) → Fetch Notion → Rebuild Page → Update Cache
```

**Estratégia**: ISR (Incremental Static Regeneration)
- **Revalidate**: 3600 segundos (60 minutos)
- **Fallback**: "blocking" (gera página on-demand se não existir)

### 3. Notion API Integration

```typescript
// lib/notion.ts
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getBlogPosts(locale: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'Locale', select: { equals: locale } },
      ],
    },
    sorts: [{ property: 'Published Date', direction: 'descending' }],
  });
  
  return response.results;
}
```

---

## Internationalization Strategy

### Estrutura de URLs

```
Português (default):
  /pt-br                → Home
  /pt-br/projetos       → Projetos
  /pt-br/blog           → Blog
  /pt-br/blog/[slug]    → Post

Inglês:
  /en-us                → Home
  /en-us/projects       → Projects
  /en-us/blog           → Blog
  /en-us/blog/[slug]    → Post
```

### Detecção de Idioma

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt-br', 'en-us'],
  defaultLocale: 'pt-br',
  localeDetection: true, // Auto-detect do browser
});
```

### Language Switcher

```typescript
// components/layout/LanguageSwitcher.tsx
<Link href={pathname} locale="pt-br">🇧🇷 PT</Link>
<Link href={pathname} locale="en-us">🇺🇸 EN</Link>
```

---

## Rendering Strategy

| Página | Strategy | Revalidate | Por quê? |
|--------|----------|------------|----------|
| Home | SSG | - | Conteúdo estático |
| Projetos (lista) | SSG | - | Conteúdo estático |
| Projeto individual | SSG | - | Conteúdo estático |
| Blog (lista) | ISR | 3600s | Posts novos do Notion |
| Blog (post) | ISR | 3600s | Edições no Notion |

**SSG** = Static Site Generation (build time)
**ISR** = Incremental Static Regeneration (revalidate periódico)

---

## Caching Strategy

### Vercel Edge Cache

```typescript
// app/[locale]/blog/page.tsx
export const revalidate = 3600; // 1 hora

// Force cache on production
export const dynamic = 'force-static';
```

### Notion API Cache

```typescript
// lib/notion.ts
import { unstable_cache } from 'next/cache';

export const getCachedPosts = unstable_cache(
  async (locale: string) => getBlogPosts(locale),
  ['blog-posts'],
  { revalidate: 3600 }
);
```

---

## Build & Deploy Pipeline

### Git Workflow

```
main branch (produção)
  ↓
  Push to GitHub
  ↓
  Vercel CI/CD (automático)
  ↓
  Build Next.js
  ↓
  Deploy to Edge Network
  ↓
  ✅ Live em raphai.eu
```

### Build Process

```bash
# 1. Install dependencies
bun install

# 2. Build Next.js
bun run build

# 3. Generate static pages
# - Home (pt-br, en-us)
# - Projetos (pt-br, en-us)
# - Blog posts (fetch do Notion)

# 4. Optimize assets
# - Compress images
# - Generate WebP
# - Tree-shake CSS/JS

# 5. Upload to Vercel
# - Deploy to Edge CDN
# - Serverless functions
```

**Build Time**: ~2-3 minutos (estimado)

---

## Environment Variables

### Development (`.env.local`)

```bash
# Notion
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# Analytics (opcional em dev)
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0

# Next.js
NODE_ENV=development
```

### Production (Vercel Dashboard)

```bash
# Notion
NOTION_API_KEY=secret_xxx (encrypted)
NOTION_DATABASE_ID=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0

# Vercel (automático)
VERCEL=1
VERCEL_ENV=production
VERCEL_URL=raphai.eu
```

---

## Performance Optimizations

### Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    domains: ['notion.so', 'images.unsplash.com'], // Notion images
  },
};
```

### Font Optimization

```typescript
// app/layout.tsx
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
```

### Bundle Size

- **Route code splitting**: Automático (App Router)
- **Dynamic imports**: Para componentes pesados
- **Tree shaking**: Automático (Webpack/Turbopack)
- **CSS purging**: Automático (Tailwind)

---

## Security

### Headers

```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
},
```

### Environment Variables

- Nunca expor `NOTION_API_KEY` no client-side
- Usar `NEXT_PUBLIC_*` apenas para variáveis públicas
- Vercel encrypta automaticamente secrets

---

## Monitoring & Debugging

### Vercel Analytics

- Real User Monitoring (RUM)
- Core Web Vitals
- Error tracking
- Performance insights

### Logs

```bash
# Development
bun run dev

# Production (Vercel Dashboard)
# - Real-time logs
# - Function logs
# - Build logs
```

---

## Próximos Passos

1. ✅ Estrutura de diretórios
2. 🏗️ Setup inicial
3. 🎨 Componentes base
4. 🌐 i18n implementation
5. 🔌 Notion integration
6. 📊 Analytics & SEO
7. 🚀 Deploy
