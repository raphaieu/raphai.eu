# Blog Setup - raphai.eu

## ✅ Estrutura Implementada

### Arquivos Criados

1. **`lib/notion.ts`** - Cliente Notion e funções de busca
2. **`app/[locale]/blog/page.tsx`** - Listagem de posts
3. **`app/[locale]/blog/[slug]/page.tsx`** - Post individual
4. **`components/blog/PostCard.tsx`** - Card do post
5. **`components/blog/NotionRenderer.tsx`** - Renderizador de conteúdo

### Traduções Adicionadas

- **`messages/pt-br.json`**: Traduções em português
- **`messages/en-us.json`**: Traduções em inglês

### Links de Navegação

- Link "Blog" adicionado ao Header (desktop e mobile)
- Navegação funcional entre páginas com i18n

---

## 🔧 Próximos Passos

### 1. Configurar Notion Workspace

Siga o guia completo em **`docs/NOTION_SETUP.md`** para:

1. Criar database no Notion
2. Criar integration e obter API key
3. Configurar properties (Title, Slug, Status, Locale, etc.)
4. Conectar integration ao database
5. Obter database ID

### 2. Configurar Variáveis de Ambiente

#### Local (`.env.local`)

```bash
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a1b2c3d4e5f67890a1b2c3d4e5f67890

# Analytics
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0
```

#### Vercel (Produção)

1. Acesse [vercel.com](https://vercel.com)
2. Vá em seu projeto → Settings → Environment Variables
3. Adicione:
   - `NOTION_API_KEY` (secret)
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_GA_ID`

### 3. Escrever Primeiro Post de Teste

No Notion, crie um post com:

- **Title**: "Primeiro Post"
- **Slug**: `primeiro-post`
- **Status**: Published
- **Locale**: pt-br
- **Summary**: "Resumo do primeiro post..."
- **Published Date**: Data atual
- **Tags**: Desenvolvimento, Blog
- **Cover**: Imagem (opcional)

### 4. Testar Localmente

```bash
bun run dev
```

Acesse:
- Blog PT-BR: [http://localhost:3000/pt-br/blog](http://localhost:3000/pt-br/blog)
- Blog EN-US: [http://localhost:3000/en-us/blog](http://localhost:3000/en-us/blog)

### 5. Deploy na Vercel

```bash
git add .
git commit -m "feat: adicionar blog com Notion CMS"
git push origin main
```

---

## 📝 Como Escrever Posts

### Estrutura de um Post no Notion

```
📄 Título do Post
├── Properties:
│   ├── Title: "Como criar um site com Next.js"
│   ├── Slug: "site-nextjs" (lowercase, sem acentos)
│   ├── Status: Published
│   ├── Published Date: 2026-02-10
│   ├── Locale: pt-br ou en-us
│   ├── Summary: "Aprenda a criar..." (150-160 chars)
│   ├── Tags: Next.js, Tutorial, Desenvolvimento
│   ├── Cover: [imagem 1200x630px]
│   ├── Reading Time: 5 (minutos)
│   └── Featured: ✓ (opcional)
│
└── Content (Page Body):
    ├── Heading 1: "Introdução"
    ├── Paragraph: "Neste tutorial..."
    ├── Heading 2: "Passo 1"
    ├── Bulleted List
    ├── Code Block (TypeScript)
    ├── Image
    └── Callout
```

### Best Practices

#### SEO
- **Summary**: 150-160 caracteres
- **Slug**: lowercase, sem acentos, separado por hífens
- **Cover**: 1200x630px (Open Graph)

#### Content
- Use **Headings** (H1, H2, H3) para estrutura
- **Code blocks** com syntax highlighting
- **Callouts** para informações importantes
- **Images** otimizadas (WebP, < 200kb)

---

## 🚀 Features Implementadas

### Funcionalidades

✅ **Listagem de Posts**
- Grid responsivo (1 coluna mobile, 2 desktop, 3 large)
- Cards com imagem de capa
- Tags, título, resumo, data e tempo de leitura
- Badge "Destaque" para posts featured
- Filtro por locale (pt-br / en-us)
- Ordenação por data (mais recente primeiro)

✅ **Post Individual**
- Renderização completa do conteúdo do Notion
- Imagem de capa em destaque
- Meta informações (data, tempo de leitura)
- Tags visíveis
- Botão "Voltar para o blog"
- SEO otimizado (meta tags, Open Graph, Twitter Cards)

✅ **Internacionalização (i18n)**
- Suporte completo para pt-br e en-us
- URLs localizadas (`/pt-br/blog`, `/en-us/blog`)
- Conteúdo filtrado por locale
- Datas formatadas no idioma correto

✅ **Performance**
- ISR (Incremental Static Regeneration) - revalidate a cada 1 hora
- Static generation de posts com `generateStaticParams`
- Imagens otimizadas com `next/image`

✅ **Design**
- Mobile-first
- Glass effect no header
- Animações suaves
- Tipografia otimizada para leitura
- Responsivo em todos os breakpoints

---

## 🎨 Personalizações Futuras

### Adicionar mais features (opcional)

1. **Busca de Posts**
   - Campo de busca por título/tags
   - Filtro por categoria

2. **Paginação**
   - Implementar paginação se houver muitos posts
   - Lazy loading

3. **Comentários**
   - Integrar Disqus ou Giscus

4. **RSS Feed**
   - Criar `app/blog/rss.xml/route.ts`

5. **Related Posts**
   - Mostrar posts relacionados ao final

6. **Syntax Highlighting**
   - Melhorar highlight de código com Prism.js

---

## 💬 Comentários (Cusdis)

O **Notion não oferece comentários públicos** para páginas publicadas (os comentários do Notion são para colaboradores). O projeto usa **Cusdis**: leve, sem ads, e qualquer pessoa pode comentar com **nome + e-mail** (sem precisar de conta GitHub).

### Ativar Cusdis

1. Acesse [cusdis.com](https://cusdis.com), crie uma conta e **crie um site**.
2. No dashboard, copie o **App ID** do código de embed.
3. No `.env.local` (e na Vercel), adicione:

```bash
NEXT_PUBLIC_CUSDIS_APP_ID=seu-app-id
# Opcional, só se for self-hosted:
# NEXT_PUBLIC_CUSDIS_HOST=https://seu-cusdis.com
```

4. Faça deploy; a seção "Comentários" nos posts passará a exibir o widget do Cusdis.

### Alternativas

- **Giscus** / **Utterances**: comentários via GitHub (ideal para blog técnico; exige conta GitHub).
- **Disqus**: muito usado, mas tem ads no plano gratuito.

---

## 📊 Analytics

Os posts do blog automaticamente rastreiam:

- Visualizações de página (Google Analytics)
- Tempo na página
- Taxa de rejeição
- Origem do tráfego

---

## ❓ Troubleshooting

### Posts não aparecem

- Verifique se o **Status** está como "Published"
- Confirme que o **Locale** está correto (pt-br ou en-us)
- Verifique se a **Published Date** não está no futuro
- Confirme que a integration está conectada ao database

### Erro "Unauthorized"

- Verifique se o `NOTION_API_KEY` está correto
- Confirme que a integration está conectada ao database

### Imagens não carregam / timeout (ERR_TIMED_OUT)

- As capas e imagens do Notion vêm do S3 e podem dar timeout no client. O projeto usa um **proxy de imagens** (`/api/image-proxy`) para servir essas imagens pelo nosso servidor (timeout maior, mais estável).
- Se ainda falhar, confira `NEXT_PUBLIC_SITE_URL` (ou o domínio real) para que o proxy seja chamado na mesma origem.

### Build falha

- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que o `NOTION_DATABASE_ID` está correto
- Verifique se há pelo menos um post publicado

---

## 📚 Documentação

- [Notion API Docs](https://developers.notion.com/)
- [react-notion-x](https://github.com/NotionX/react-notion-x)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

---

**✅ Blog está pronto! Agora é só configurar o Notion e começar a escrever!** 🚀
