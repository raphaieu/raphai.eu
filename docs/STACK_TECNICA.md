# Stack Técnica - raphai.eu

## Resumo Executivo

Site BIO pessoal com showcase de projetos e blog integrado, focado em atrair recruiters e gerar oportunidades profissionais.

**Stack**: Next.js 15 + TypeScript + Tailwind CSS + Notion API + Vercel

---

## Core Technologies

### Next.js 15 (App Router)
- **Versão**: ^15.0.0
- **Por quê?**
  - Renderização híbrida (Static + SSR)
  - SEO otimizado nativamente
  - Performance excepcional (Core Web Vitals)
  - Image Optimization automática
  - API Routes serverless
  - File-based routing
- **Features usadas**:
  - App Router (nova arquitetura)
  - Server Components
  - Metadata API (SEO)
  - Image component
  - Internationalization

### TypeScript
- **Versão**: ^5.3.0
- **Por quê?**
  - Type safety
  - Melhor DX (autocomplete, refactoring)
  - Documentação viva
  - Menos bugs em produção

### Tailwind CSS
- **Versão**: ^3.4.0
- **Por quê?**
  - Já utilizado no template premium
  - Utility-first approach
  - Mobile-first por padrão
  - Build otimizado (PurgeCSS integrado)
  - Customização total via config
- **Plugins**:
  - `@tailwindcss/typography` - Para estilizar conteúdo do blog (Notion)
  - `tailwindcss-animate` - Animações do template

---

## Internationalization

### next-intl
- **Versão**: ^3.0.0
- **Por quê?**
  - Solução oficial recomendada para Next.js
  - Serverless-friendly
  - Type-safe translations
  - Route localization automática
  - Lightweight
- **Idiomas suportados**:
  - `pt-BR` (Português Brasil) - Default
  - `en-US` (English US)
- **Estratégia de URLs**:
  - `/pt-br/projetos` → Português
  - `/en-us/projects` → Inglês
  - Redirect automático baseado no browser locale

---

## Content Management

### Notion API (Blog)
- **SDK**: `@notionhq/client` ^2.2.0
- **Por quê?**
  - Interface visual amigável para escrever
  - API REST robusta e bem documentada
  - Free tier generoso (sem limites de requests para uso pessoal)
  - Suporte a rich content (imagens, código, embeds)
  - Versionamento nativo (histórico de edições)
  - Colaboração futura (se necessário)
- **Estratégia**:
  - Database no Notion com posts
  - Serverless function busca dados via API
  - Cache no Next.js (ISR - Incremental Static Regeneration)
  - Revalidation a cada 60 minutos

### MDX (Projetos)
- **Pacote**: `@next/mdx` + `remark-gfm`
- **Por quê?**
  - Projetos mudam pouco (versionamento no Git é suficiente)
  - Permite componentes React interativos
  - Syntax highlighting para código
  - Type-safe com TypeScript
  - Build time rendering (performance máxima)

---

## Analytics & Monitoring

### Google Analytics 4
- **ID**: `G-VDYG8GFRG0`
- **Implementação**: `next/script` com strategy "afterInteractive"
- **Eventos customizados**:
  - Click em projetos (demo links)
  - Click em WhatsApp
  - Submit de contato
  - Language switch

### Vercel Analytics
- **Speed Insights**: Core Web Vitals monitoring
- **Audience Analytics**: Pageviews, visitors
- **Free tier**: Até 100k events/mês

---

## SEO & Meta Tags

### next-seo
- **Versão**: ^6.5.0
- **Features**:
  - Meta tags automáticas
  - Open Graph (Facebook, LinkedIn)
  - Twitter Cards
  - JSON-LD structured data

### Sitemap & Robots
- **Geração automática**: Next.js metadata API
- **Sitemap**: `sitemap.xml` dinâmico (páginas + posts do blog)
- **Robots.txt**: Permitir all, sitemap URL

---

## Image Optimization

### Vercel Image Optimization
- **Limits (Free Tier)**: 1000 otimizações/mês
- **Formatos**: WebP automático (com fallback)
- **Lazy loading**: Automático
- **Responsive**: srcset automático

### Cloudinary (Backup/Overflow)
- **Free Tier**: 25 GB storage + 25 GB bandwidth/mês
- **Uso**: Screenshots de projetos em alta resolução

---

## Deployment & CI/CD

### Vercel
- **Free Tier**:
  - Projetos ilimitados ✅
  - 100 GB bandwidth/mês
  - Serverless functions (100 GB-hours/mês)
  - Custom domains
  - SSL automático
  - Edge Network global
- **CI/CD**:
  - Git push → Deploy automático
  - Preview deployments para PRs
  - Production deployment na branch `main`
- **Variáveis de ambiente**:
  - `NOTION_API_KEY` - Token da integração Notion
  - `NOTION_DATABASE_ID` - ID do database de posts
  - `NEXT_PUBLIC_GA_ID` - Google Analytics ID

---

## Development Tools

### Package Manager
- **bun** (ou npm/pnpm)
- Já está instalado no workspace

### Linting & Formatting
- **ESLint**: Configuração Next.js
- **Prettier**: Code formatting
- **TypeScript**: Strict mode

### Testing (Futuro)
- **Playwright**: E2E tests
- **Vitest**: Unit tests

---

## Dependencies Overview

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-intl": "^3.0.0",
    "@notionhq/client": "^2.2.0",
    "next-seo": "^6.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.10",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## Performance Goals

- **Lighthouse Score**: 100/100 em todas as categorias
- **FCP (First Contentful Paint)**: < 1.0s
- **LCP (Largest Contentful Paint)**: < 2.0s
- **TTI (Time to Interactive)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Bundle Size**: < 150 KB (gzipped)

---

## Browser Support

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

---

## Próximos Passos

1. ✅ Documentação completa
2. 🏗️ Setup inicial do Next.js
3. 🎨 Componentes base (Header, Footer, Layout)
4. 🌐 Configuração i18n
5. 🔌 Integração Notion
6. 📊 Analytics & SEO
7. 🚀 Primeiro deploy
