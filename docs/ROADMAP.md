# Roadmap - raphai.eu

## Overview

Plano de implementação dividido em fases, do MVP até features avançadas.

---

## Fase 0: Preparação ✅

### Setup Inicial
- [x] Criar documentação técnica
- [x] Definir stack e arquitetura
- [x] Mapear conteúdo
- [x] Especificar projetos
- [x] Planejar SEO e analytics
- [x] Documentar design system

### Assets
- [ ] Foto de perfil profissional (800x800px)
- [ ] Screenshots dos projetos (15 imagens no total)
- [ ] Open Graph images (7 imagens)
- [ ] Favicon + variants (6 tamanhos)
- [ ] Logo/monograma (SVG)

**Tempo estimado**: ✅ Completo

---

## Fase 1: MVP - Core do Site 🚀

### 1.1 Setup do Projeto

**Tasks**:
- [ ] Inicializar Next.js 15 com TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Configurar fontes (Inter + Space Grotesk)
- [ ] Setup do ESLint + Prettier
- [ ] Criar estrutura de pastas
- [ ] Configurar `.env.local` + `.env.example`

**Arquivos**:
```
package.json
next.config.js
tailwind.config.ts
tsconfig.json
.env.local
```

**Tempo estimado**: 1-2 horas

---

### 1.2 Design System & Componentes Base

**Tasks**:
- [ ] Configurar cores no Tailwind
- [ ] Configurar animações (keyframes)
- [ ] Criar componente `Button`
- [ ] Criar componente `Card`
- [ ] Criar componente `Badge`
- [ ] Criar componente `ScrollReveal`
- [ ] Adicionar efeitos especiais (gradient, glass)

**Arquivos**:
```
styles/globals.css
components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Badge.tsx
components/ui/ScrollReveal.tsx
```

**Tempo estimado**: 3-4 horas

---

### 1.3 Layout Principal

**Tasks**:
- [ ] Criar `RootLayout` (app/layout.tsx)
- [ ] Criar componente `Header` (navegação)
- [ ] Criar componente `Footer`
- [ ] Criar componente `WhatsAppButton` (fixed)
- [ ] Adicionar fontes otimizadas
- [ ] Configurar meta tags globais

**Arquivos**:
```
app/layout.tsx
components/layout/Header.tsx
components/layout/Footer.tsx
components/layout/WhatsAppButton.tsx
```

**Tempo estimado**: 4-5 horas

---

### 1.4 Home Page (PT-BR apenas)

**Tasks**:
- [ ] Criar componente `Hero`
- [ ] Criar componente `About`
- [ ] Criar componente `Manifesto`
- [ ] Criar componente `ProjectsShowcase`
- [ ] Criar componente `Contact`
- [ ] Integrar todos na página principal
- [ ] Adicionar scroll suave
- [ ] Adicionar scroll reveal animations

**Arquivos**:
```
app/page.tsx (redirect to /pt-br)
app/pt-br/page.tsx
components/home/Hero.tsx
components/home/About.tsx
components/home/Manifesto.tsx
components/home/ProjectsShowcase.tsx
components/home/Contact.tsx
```

**Tempo estimado**: 6-8 horas

---

### 1.5 Página de Projetos (PT-BR)

**Tasks**:
- [ ] Criar componente `ProjectCard`
- [ ] Criar página de lista de projetos
- [ ] Adicionar dados dos 3 projetos (hardcoded)
- [ ] Adicionar screenshots
- [ ] Adicionar links para demos

**Arquivos**:
```
app/pt-br/projetos/page.tsx
components/projects/ProjectCard.tsx
components/projects/TechStack.tsx
data/projects.ts
```

**Tempo estimado**: 3-4 horas

---

### 1.6 Deploy Inicial

**Tasks**:
- [ ] Criar repositório no GitHub
- [ ] Fazer commit inicial
- [ ] Conectar com Vercel
- [ ] Configurar domínio (raphai.eu)
- [ ] Configurar SSL (automático Vercel)
- [ ] Testar deploy

**Tempo estimado**: 1-2 horas

---

**Total Fase 1**: 18-25 horas
**Deadline sugerido**: 3-5 dias

---

## Fase 2: Internacionalização (i18n) 🌐

### 2.1 Setup next-intl

**Tasks**:
- [ ] Instalar `next-intl`
- [ ] Configurar middleware de locale
- [ ] Criar arquivos de tradução (pt-br.json, en-us.json)
- [ ] Refatorar rotas para `[locale]`
- [ ] Criar `LanguageSwitcher`

**Arquivos**:
```
middleware.ts
messages/pt-br.json
messages/en-us.json
components/layout/LanguageSwitcher.tsx
```

**Tempo estimado**: 4-6 horas

---

### 2.2 Traduzir Conteúdo

**Tasks**:
- [ ] Traduzir Hero
- [ ] Traduzir About
- [ ] Traduzir Manifesto
- [ ] Traduzir Projetos
- [ ] Traduzir Contact
- [ ] Traduzir meta tags
- [ ] Testar language switcher

**Tempo estimado**: 3-4 horas

---

**Total Fase 2**: 7-10 horas
**Deadline sugerido**: 1-2 dias

---

## Fase 3: Blog com Notion 📝

### 3.1 Setup Notion

**Tasks**:
- [ ] Criar Notion workspace
- [ ] Criar database "Blog - raphai.eu"
- [ ] Configurar properties
- [ ] Criar Notion Integration
- [ ] Obter API Key e Database ID
- [ ] Escrever 2 posts de teste (1 PT, 1 EN)

**Tempo estimado**: 2-3 horas

---

### 3.2 Integração Notion API

**Tasks**:
- [ ] Instalar `@notionhq/client`
- [ ] Criar `lib/notion.ts`
- [ ] Implementar `getBlogPosts()`
- [ ] Implementar `getBlogPostBySlug()`
- [ ] Implementar `getPageContent()`
- [ ] Adicionar types do TypeScript

**Arquivos**:
```
lib/notion.ts
types/notion.ts
```

**Tempo estimado**: 3-4 horas

---

### 3.3 Páginas do Blog

**Tasks**:
- [ ] Criar página de lista de posts
- [ ] Criar componente `PostCard`
- [ ] Criar página de post individual
- [ ] Implementar renderização de blocos do Notion
- [ ] Adicionar syntax highlighting (código)
- [ ] Configurar ISR (revalidate: 3600)
- [ ] Adicionar breadcrumbs

**Arquivos**:
```
app/[locale]/blog/page.tsx
app/[locale]/blog/[slug]/page.tsx
components/blog/PostCard.tsx
components/blog/PostList.tsx
components/blog/NotionRenderer.tsx
```

**Tempo estimado**: 6-8 horas

---

### 3.4 Estilização do Blog

**Tasks**:
- [ ] Configurar `@tailwindcss/typography`
- [ ] Estilizar conteúdo do blog (prose)
- [ ] Adicionar Table of Contents
- [ ] Adicionar "Reading Time"
- [ ] Adicionar share buttons (opcional)

**Tempo estimado**: 2-3 horas

---

**Total Fase 3**: 13-18 horas
**Deadline sugerido**: 2-3 dias

---

## Fase 4: SEO & Analytics 📊

### 4.1 Google Analytics

**Tasks**:
- [ ] Configurar Google Analytics 4
- [ ] Adicionar script no layout
- [ ] Criar `lib/analytics.ts` (events)
- [ ] Adicionar tracking em CTAs
- [ ] Testar eventos customizados

**Arquivos**:
```
lib/analytics.ts
```

**Tempo estimado**: 2-3 horas

---

### 4.2 Vercel Analytics

**Tasks**:
- [ ] Instalar `@vercel/analytics`
- [ ] Adicionar componente no layout
- [ ] Habilitar Speed Insights
- [ ] Testar coleta de dados

**Tempo estimado**: 1 hora

---

### 4.3 Meta Tags & SEO

**Tasks**:
- [ ] Configurar meta tags globais
- [ ] Adicionar Open Graph images
- [ ] Adicionar Twitter Cards
- [ ] Implementar JSON-LD (Person schema)
- [ ] Implementar JSON-LD (BlogPosting schema)
- [ ] Configurar canonical URLs
- [ ] Adicionar alternates (i18n)

**Tempo estimado**: 3-4 horas

---

### 4.4 Sitemap & Robots

**Tasks**:
- [ ] Implementar `sitemap.ts`
- [ ] Implementar `robots.ts`
- [ ] Testar geração automática
- [ ] Submeter ao Google Search Console

**Arquivos**:
```
app/sitemap.ts
app/robots.ts
```

**Tempo estimado**: 2 horas

---

**Total Fase 4**: 8-10 horas
**Deadline sugerido**: 1-2 dias

---

## Fase 5: Polish & Otimizações ✨

### 5.1 Performance

**Tasks**:
- [ ] Otimizar imagens (WebP/AVIF)
- [ ] Configurar Image Optimization
- [ ] Implementar lazy loading
- [ ] Adicionar preload de fontes
- [ ] Minimizar bundle size
- [ ] Rodar Lighthouse (target: 100/100)

**Tempo estimado**: 3-4 horas

---

### 5.2 Acessibilidade

**Tasks**:
- [ ] Adicionar alt text em todas imagens
- [ ] Adicionar ARIA labels
- [ ] Testar navegação por teclado
- [ ] Testar com screen reader
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Adicionar focus states

**Tempo estimado**: 2-3 horas

---

### 5.3 Responsividade

**Tasks**:
- [ ] Testar em mobile (375px)
- [ ] Testar em tablet (768px)
- [ ] Testar em desktop (1920px)
- [ ] Testar navegação mobile
- [ ] Ajustar espaçamentos
- [ ] Testar WhatsApp button em mobile

**Tempo estimado**: 2-3 horas

---

### 5.4 Testes Finais

**Tasks**:
- [ ] Testar todos os links
- [ ] Testar formulários (se houver)
- [ ] Testar language switcher
- [ ] Testar blog (posts, navegação)
- [ ] Testar em diferentes browsers
- [ ] Testar GTM/Analytics

**Tempo estimado**: 2-3 horas

---

**Total Fase 5**: 9-13 horas
**Deadline sugerido**: 2 dias

---

## Fase 6: Lançamento 🚀

### 6.1 Pre-Launch

**Tasks**:
- [ ] Escrever 3-5 posts no blog (PT + EN)
- [ ] Criar Open Graph images finais
- [ ] Preparar posts para redes sociais
- [ ] Testar tudo em produção
- [ ] Fazer backup do Notion database

**Tempo estimado**: 4-6 horas

---

### 6.2 Launch

**Tasks**:
- [ ] Deploy final na Vercel
- [ ] Configurar domínio definitivo
- [ ] Ativar SSL
- [ ] Submeter sitemap ao Google
- [ ] Verificar Search Console
- [ ] Postar anúncio nas redes sociais

**Tempo estimado**: 2 horas

---

### 6.3 Post-Launch

**Tasks**:
- [ ] Monitorar Analytics (primeira semana)
- [ ] Monitorar Core Web Vitals
- [ ] Coletar feedback
- [ ] Ajustar com base em feedback
- [ ] Planejar conteúdo do blog

**Tempo estimado**: Contínuo

---

**Total Fase 6**: 6-8 horas
**Deadline sugerido**: 1 dia (+ monitoramento)

---

## Resumo de Tempo

| Fase | Horas | Dias (estimado) |
|------|-------|-----------------|
| **Fase 0**: Preparação | - | ✅ Completo |
| **Fase 1**: MVP | 18-25h | 3-5 dias |
| **Fase 2**: i18n | 7-10h | 1-2 dias |
| **Fase 3**: Blog | 13-18h | 2-3 dias |
| **Fase 4**: SEO & Analytics | 8-10h | 1-2 dias |
| **Fase 5**: Polish | 9-13h | 2 dias |
| **Fase 6**: Launch | 6-8h | 1 dia |
| **TOTAL** | **61-84h** | **10-15 dias** |

---

## Features Futuras (Pós-Launch)

### Curto Prazo (1-2 meses)
- [ ] Formulário de contato (com validação)
- [ ] Newsletter signup (Mailchimp/ConvertKit)
- [ ] Página individual por projeto (detalhes completos)
- [ ] Filtros no blog (por tag, por data)
- [ ] Search no blog
- [ ] RSS feed
- [ ] Comentários nos posts (Giscus/Utterances)

### Médio Prazo (3-6 meses)
- [ ] Dashboard de métricas (analytics interno)
- [ ] A/B testing de CTAs
- [ ] Dark mode
- [ ] Animações mais avançadas (Framer Motion)
- [ ] Modo de leitura (blog)
- [ ] Progressive Web App (PWA)

### Longo Prazo (6+ meses)
- [ ] CMS próprio (substituir Notion?)
- [ ] API pública dos projetos
- [ ] Portfolio generator (para outros devs)
- [ ] Integração com GitHub (mostrar commits/activity)
- [ ] Live coding sessions (embed de Twitch/YouTube)

---

## Prioridades

### Must-Have (MVP)
1. Home page completa ✅
2. Showcase de projetos ✅
3. Blog funcional ✅
4. i18n (PT-BR + EN-US) ✅
5. SEO otimizado ✅
6. Mobile-first ✅

### Nice-to-Have
- Formulário de contato
- Newsletter
- Comentários no blog
- Dark mode

### Futuro
- Dashboard analytics
- PWA
- CMS próprio

---

## Checklist Final (Pre-Launch)

### Conteúdo
- [ ] Todos os textos revisados (PT + EN)
- [ ] Todas as imagens otimizadas
- [ ] Screenshots dos projetos
- [ ] Open Graph images criadas
- [ ] Favicon configurado
- [ ] 3-5 posts publicados

### Funcionalidades
- [ ] Navegação funcionando
- [ ] Language switcher funcionando
- [ ] Links externos (demos) testados
- [ ] WhatsApp button funcionando
- [ ] Blog carregando do Notion
- [ ] ISR funcionando (revalidate)

### SEO & Performance
- [ ] Meta tags configuradas
- [ ] Open Graph testado (Facebook Debugger)
- [ ] Twitter Cards testado
- [ ] Sitemap gerado
- [ ] Robots.txt configurado
- [ ] Lighthouse 90+ em todas categorias
- [ ] Core Web Vitals OK
- [ ] Google Analytics ativo
- [ ] Vercel Analytics ativo

### Cross-Browser
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Edge ✅
- [ ] Mobile Safari ✅
- [ ] Chrome Mobile ✅

### Deployment
- [ ] Deploy na Vercel
- [ ] Domínio configurado
- [ ] SSL ativo
- [ ] Environment variables configuradas
- [ ] Não há erros no console
- [ ] Não há links quebrados

---

## Próximos Passos Imediatos

1. ✅ Documentação completa
2. 🏗️ **AGORA**: Inicializar projeto Next.js
3. 🎨 Criar componentes base
4. 🏠 Implementar Home page
5. 🚀 Deploy MVP

**Bora começar!** 🚀
