# Notion Setup - raphai.eu

## Overview

Guia completo para configurar o Notion como CMS do blog, incluindo estrutura do database, properties, integração e código de exemplo.

---

## Passo 1: Criar Notion Workspace

1. Acesse [notion.so](https://notion.so)
2. Crie uma conta ou faça login
3. Crie um novo workspace (ou use existente)

---

## Passo 2: Criar Database para Blog Posts

### Criar Database

1. Em seu workspace, crie uma nova página: "**Blog - raphai.eu**"
2. Adicione um Database (Full Page)
3. Escolha "Table" view

### Estrutura do Database

#### Properties (Colunas)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| **Title** | Title | ✅ | Título do post (padrão do Notion) |
| **Slug** | Text | ✅ | URL amigável (ex: `primeiro-post`) |
| **Status** | Select | ✅ | Draft / Published |
| **Published Date** | Date | ✅ | Data de publicação |
| **Locale** | Select | ✅ | pt-br / en-us |
| **Summary** | Text | ✅ | Resumo para SEO (150-160 chars) |
| **Tags** | Multi-select | ❌ | Categorias (ex: Laravel, Trading, DevOps) |
| **Cover** | Files & Media | ❌ | Imagem de capa |
| **Reading Time** | Number | ❌ | Tempo de leitura em minutos (calculado) |
| **Author** | Person | ❌ | Autor (você) |
| **Featured** | Checkbox | ❌ | Post em destaque? |

#### Select Options - Status
- 🟡 **Draft** (Rascunho)
- 🟢 **Published** (Publicado)
- 🔴 **Archived** (Arquivado)

#### Select Options - Locale
- 🇧🇷 **pt-br**
- 🇺🇸 **en-us**

#### Multi-select Options - Tags (sugestões)
```
Desenvolvimento
Laravel
Vue.js
Next.js
TypeScript
Trading
Mercado Financeiro
DevOps
Cloud
Produtos
MVP
Empreendedorismo
```

---

## Passo 3: Criar Notion Integration

### Criar Integration Token

1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clique em "**+ New integration**"
3. Preencha:
   - **Name**: `raphai.eu Blog`
   - **Associated workspace**: Seu workspace
   - **Type**: Internal
   - **Capabilities**:
     - ✅ Read content
     - ✅ Read user information (para Author)
     - ❌ Update content (não necessário)
     - ❌ Insert content (não necessário)
4. Clique em "**Submit**"
5. **COPIE O TOKEN** (começa com `secret_...`)

### Conectar Integration ao Database

1. Abra a página do database "Blog - raphai.eu"
2. Clique nos 3 pontinhos (⋯) no canto superior direito
3. Clique em "**Add connections**"
4. Selecione "**raphai.eu Blog**" (sua integration)
5. Clique em "**Confirm**"

---

## Passo 4: Obter Database ID

### Método 1: Via URL

1. Abra o database no Notion
2. A URL será algo como:
   ```
   https://www.notion.so/{workspace}/{database_id}?v={view_id}
   ```
3. O `database_id` é a parte entre `/` e `?v=`
4. Exemplo:
   ```
   https://www.notion.so/raphaelmartins/a1b2c3d4e5f6...?v=...
                                      ^^^^^^^^^^^^^^^^
                                      Este é o Database ID
   ```

### Método 2: Via Share Link

1. Clique em "**Share**" no canto superior direito
2. Clique em "**Copy link**"
3. O ID estará na URL copiada

**Formato do ID**: 32 caracteres hexadecimais (ex: `a1b2c3d4e5f67890a1b2c3d4e5f67890`)

---

## Passo 5: Configurar Environment Variables

### `.env.local` (desenvolvimento)

```bash
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a1b2c3d4e5f67890a1b2c3d4e5f67890

# Next.js
NODE_ENV=development
```

### `.env.example` (template)

```bash
# Notion Integration
NOTION_API_KEY=
NOTION_DATABASE_ID=

# Analytics
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0
```

### Vercel (produção)

1. Acesse [vercel.com](https://vercel.com)
2. Vá em seu projeto → Settings → Environment Variables
3. Adicione:
   - `NOTION_API_KEY` (secret)
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_GA_ID`

---

## Passo 6: Código de Integração

### Instalar SDK

```bash
bun add @notionhq/client
```

### Client Setup (`lib/notion.ts`)

```typescript
import { Client } from '@notionhq/client';
import type {
  QueryDatabaseResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  locale: 'pt-br' | 'en-us';
  tags: string[];
  cover?: string;
  readingTime?: number;
  featured: boolean;
}

// Helper: Extract properties from Notion page
function parsePageProperties(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  return {
    id: page.id,
    title: properties.Title.type === 'title' 
      ? properties.Title.title[0]?.plain_text || '' 
      : '',
    slug: properties.Slug.type === 'rich_text'
      ? properties.Slug.rich_text[0]?.plain_text || ''
      : '',
    summary: properties.Summary.type === 'rich_text'
      ? properties.Summary.rich_text[0]?.plain_text || ''
      : '',
    publishedDate: properties['Published Date'].type === 'date'
      ? properties['Published Date'].date?.start || ''
      : '',
    locale: properties.Locale.type === 'select'
      ? (properties.Locale.select?.name as 'pt-br' | 'en-us') || 'pt-br'
      : 'pt-br',
    tags: properties.Tags.type === 'multi_select'
      ? properties.Tags.multi_select.map(tag => tag.name)
      : [],
    cover: page.cover?.type === 'external'
      ? page.cover.external.url
      : page.cover?.type === 'file'
      ? page.cover.file.url
      : undefined,
    readingTime: properties['Reading Time']?.type === 'number'
      ? properties['Reading Time'].number || undefined
      : undefined,
    featured: properties.Featured?.type === 'checkbox'
      ? properties.Featured.checkbox
      : false,
  };
}

// Fetch published posts by locale
export async function getBlogPosts(locale: 'pt-br' | 'en-us'): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        {
          property: 'Locale',
          select: {
            equals: locale,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Published Date',
        direction: 'descending',
      },
    ],
  });

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(parsePageProperties);
}

// Fetch single post by slug
export async function getBlogPostBySlug(
  slug: string,
  locale: 'pt-br' | 'en-us'
): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Locale',
          select: {
            equals: locale,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as PageObjectResponse;
  return parsePageProperties(page);
}

// Fetch page content (blocks)
export async function getPageContent(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}
```

### Usage Example (`app/[locale]/blog/page.tsx`)

```typescript
import { getBlogPosts } from '@/lib/notion';
import PostCard from '@/components/blog/PostCard';

export const revalidate = 3600; // Revalidate every hour

interface BlogPageProps {
  params: { locale: 'pt-br' | 'en-us' };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await getBlogPosts(params.locale);

  return (
    <div>
      <h1>Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
```

---

## Passo 7: Renderizar Conteúdo do Notion

### Opção 1: Biblioteca `react-notion-x` (Recomendado)

```bash
bun add react-notion-x notion-utils
```

```typescript
// components/blog/NotionRenderer.tsx
import { NotionRenderer as Renderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

interface NotionRendererProps {
  recordMap: any; // ExtendedRecordMap from notion-utils
}

export default function NotionRenderer({ recordMap }: NotionRendererProps) {
  return (
    <Renderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      components={{
        // Customize components if needed
      }}
    />
  );
}
```

### Opção 2: Renderização Manual

```typescript
// lib/notion-blocks.tsx
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export function renderBlock(block: BlockObjectResponse) {
  const { type } = block;

  switch (type) {
    case 'paragraph':
      return <p>{block.paragraph.rich_text[0]?.plain_text}</p>;
    
    case 'heading_1':
      return <h1>{block.heading_1.rich_text[0]?.plain_text}</h1>;
    
    case 'heading_2':
      return <h2>{block.heading_2.rich_text[0]?.plain_text}</h2>;
    
    case 'heading_3':
      return <h3>{block.heading_3.rich_text[0]?.plain_text}</h3>;
    
    case 'bulleted_list_item':
      return <li>{block.bulleted_list_item.rich_text[0]?.plain_text}</li>;
    
    case 'code':
      return (
        <pre>
          <code>{block.code.rich_text[0]?.plain_text}</code>
        </pre>
      );
    
    // Add more block types as needed...
    
    default:
      return null;
  }
}
```

---

## Exemplo de Post no Notion

### Estrutura

```
📄 Primeiro Post no Blog
├── Properties:
│   ├── Title: "Como criar um site com Next.js e Notion"
│   ├── Slug: "site-nextjs-notion"
│   ├── Status: Published
│   ├── Published Date: 2026-02-10
│   ├── Locale: pt-br
│   ├── Summary: "Aprenda a criar um site moderno usando Next.js..."
│   ├── Tags: Next.js, Notion, Desenvolvimento
│   ├── Cover: [imagem]
│   ├── Reading Time: 5
│   └── Featured: ✓
│
└── Content (Page Body):
    ├── Heading 1: "Introdução"
    ├── Paragraph: "Neste tutorial..."
    ├── Heading 2: "Passo 1: Setup"
    ├── Bulleted List:
    │   - Item 1
    │   - Item 2
    ├── Code Block (language: typescript)
    ├── Image
    └── Callout
```

---

## Troubleshooting

### Erro: "Unauthorized"
- Verifique se o `NOTION_API_KEY` está correto
- Confirme que a integration está conectada ao database

### Erro: "Database not found"
- Verifique se o `NOTION_DATABASE_ID` está correto
- Confirme que a integration tem permissão de leitura

### Posts não aparecem
- Verifique se o Status está como "Published"
- Confirme que o Locale está correto (pt-br ou en-us)
- Verifique se a Published Date não está no futuro

### Imagens não carregam
- URLs do Notion expiram após ~1 hora
- Solução: hospedar imagens em Cloudinary ou Vercel Blob
- Ou usar Notion como preview e linkar imagens externas

---

## Best Practices

### SEO
- **Summary**: 150-160 caracteres
- **Slug**: lowercase, sem acentos, separado por hífens
- **Cover**: 1200x630px (Open Graph)

### Content
- Use **Headings** (H1, H2, H3) para estrutura
- **Code blocks** com syntax highlighting
- **Callouts** para destacar informações importantes
- **Images** otimizadas (WebP, < 200kb)

### Performance
- Habilitar ISR (revalidate: 3600)
- Cachear responses do Notion
- Lazy load de imagens

---

## Próximos Passos

1. ✅ Notion configurado
2. 📝 Escrever primeiro post de teste
3. 🔌 Integrar no Next.js
4. 🎨 Estilizar com Tailwind (typography plugin)
5. 🚀 Testar em development
6. 🌐 Deploy na Vercel
