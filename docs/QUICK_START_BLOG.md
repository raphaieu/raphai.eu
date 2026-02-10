# Blog - Quick Start 🚀

## ✅ O que já está pronto

✅ Estrutura completa do blog implementada  
✅ Integração com Notion API configurada  
✅ Suporte a i18n (pt-br e en-us)  
✅ Link "Blog" no Header (desktop e mobile)  
✅ Páginas de listagem e post individual  
✅ SEO otimizado (metadata, Open Graph, Twitter Cards)  
✅ ISR (revalidação a cada 1 hora)  
✅ Design responsivo e mobile-first  

---

## 🔧 O que você precisa fazer

### 1. Configurar Notion (15 min)

#### Passo 1: Criar Database
1. Acesse [notion.so](https://notion.so)
2. Crie uma nova página: **"Blog - raphai.eu"**
3. Adicione um Database (Full Page, Table view)

#### Passo 2: Adicionar Properties
Crie estas colunas no database:

| Property | Type | Obrigatório? |
|----------|------|--------------|
| **Title** | Title | ✅ Sim |
| **Slug** | Text | ✅ Sim |
| **Status** | Select | ✅ Sim |
| **Published Date** | Date | ✅ Sim |
| **Locale** | Select | ✅ Sim |
| **Summary** | Text | ✅ Sim |
| **Tags** | Multi-select | ❌ Não |
| **Cover** | Files & Media | ❌ Não |
| **Reading Time** | Number | ❌ Não |
| **Featured** | Checkbox | ❌ Não |

**Opções do Select "Status":**
- 🟢 Published
- 🟡 Draft
- 🔴 Archived

**Opções do Select "Locale":**
- 🇧🇷 pt-br
- 🇺🇸 en-us

#### Passo 3: Criar Integration
1. Acesse [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clique em **"+ New integration"**
3. Preencha:
   - **Name**: `raphai.eu Blog`
   - **Associated workspace**: Seu workspace
   - **Type**: Internal
   - **Capabilities**: ✅ Read content, ✅ Read user information
4. Clique em **"Submit"**
5. **COPIE O TOKEN** (começa com `secret_...`)

#### Passo 4: Conectar Integration ao Database
1. Abra a página do database "Blog - raphai.eu"
2. Clique nos 3 pontinhos (⋯) → **"Add connections"**
3. Selecione **"raphai.eu Blog"**
4. Clique em **"Confirm"**

#### Passo 5: Obter Database ID
1. Abra o database no Notion
2. A URL será: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
3. O `database_id` é a parte entre `/` e `?v=` (32 caracteres)

---

### 2. Configurar Variáveis de Ambiente (2 min)

Crie o arquivo `.env.local` na raiz do projeto:

```bash
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a1b2c3d4e5f67890a1b2c3d4e5f67890

# Analytics
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0
```

**⚠️ IMPORTANTE**: Adicione `.env.local` ao `.gitignore` (já está configurado)

---

### 3. Escrever Primeiro Post (5 min)

No Notion, crie um post de teste:

**Properties:**
- **Title**: `Meu primeiro post`
- **Slug**: `primeiro-post` (lowercase, sem acentos)
- **Status**: `Published`
- **Locale**: `pt-br`
- **Summary**: `Este é o meu primeiro post no blog. Aprenda a usar Notion como CMS.`
- **Published Date**: Data atual
- **Tags**: `Blog`, `Desenvolvimento`
- **Cover**: Imagem opcional (1200x630px)
- **Reading Time**: `3`
- **Featured**: ✅ (opcional)

**Conteúdo (Page Body):**

```
# Introdução

Este é o meu primeiro post usando Notion como CMS!

## Por que Notion?

- Fácil de usar
- Interface intuitiva
- Grátis para uso pessoal

## Próximos passos

Vou começar a criar conteúdo regularmente sobre desenvolvimento, produtos e tecnologia.

> "Building > Planning · Doing > Thinking · Freedom > Status"
```

---

### 4. Testar Localmente (2 min)

```bash
# Limpar cache (se necessário)
rm -rf .next

# Iniciar servidor
bun run dev
```

Acesse:
- Blog PT-BR: [http://localhost:3000/pt-br/blog](http://localhost:3000/pt-br/blog)
- Blog EN-US: [http://localhost:3000/en-us/blog](http://localhost:3000/en-us/blog)

---

### 5. Deploy na Vercel (5 min)

#### Passo 1: Adicionar Variáveis de Ambiente
1. Acesse [vercel.com](https://vercel.com)
2. Vá em seu projeto → **Settings** → **Environment Variables**
3. Adicione:
   - `NOTION_API_KEY` → `secret_xxx...` → **All** environments
   - `NOTION_DATABASE_ID` → `a1b2c3d4...` → **All** environments
   - `NEXT_PUBLIC_GA_ID` → `G-VDYG8GFRG0` → **All** environments

#### Passo 2: Deploy
```bash
git add .
git commit -m "feat: adicionar blog com Notion CMS"
git push origin main
```

A Vercel fará deploy automaticamente! 🚀

---

## 📝 Como escrever mais posts

### Estrutura recomendada

```
# Título Principal (H1)

Parágrafo de introdução...

## Seção 1 (H2)

Conteúdo da seção...

### Subseção (H3)

Mais detalhes...

## Seção 2

- Lista item 1
- Lista item 2
- Lista item 3

> Citação ou callout importante

## Código

Use code blocks com syntax highlighting:

```typescript
function hello() {
  console.log('Hello, World!');
}
```
```

### Best Practices

✅ **SEO**
- **Summary**: 150-160 caracteres
- **Slug**: lowercase, sem acentos, apenas letras, números e hífens
- **Cover**: 1200x630px (formato Open Graph)
- **Tags**: 2-5 tags relevantes

✅ **Content**
- Use **Headings** para estrutura (H1, H2, H3)
- Adicione **imagens** para ilustrar
- Use **code blocks** com linguagem específica
- Adicione **callouts** para destacar informações
- Mantenha parágrafos curtos (2-4 linhas)

✅ **Reading Time**
- 200-250 palavras = ~1 minuto
- Calcule manualmente ou deixe vazio

---

## ❓ Troubleshooting

### Posts não aparecem?
- ✅ Verifique se **Status** = `Published`
- ✅ Confirme que **Locale** está correto
- ✅ Verifique se **Published Date** não está no futuro
- ✅ Confirme que a integration está conectada ao database

### Erro "Unauthorized"?
- ✅ Verifique `NOTION_API_KEY` no `.env.local`
- ✅ Confirme que a integration está conectada ao database

### Imagens não carregam?
- URLs do Notion expiram após ~1 hora
- Solução: hospedar imagens em Cloudinary ou Vercel Blob
- Ou usar links externos permanentes (ex: GitHub, CDN)

---

## 🎯 Próximos passos

Agora você pode:

1. ✅ Escrever mais posts no Notion
2. ✅ Criar posts em inglês (Locale: `en-us`)
3. ✅ Adicionar imagens de capa
4. ✅ Marcar posts como "Featured"
5. ✅ Compartilhar posts nas redes sociais

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- **`docs/NOTION_SETUP.md`** - Guia completo do Notion
- **`docs/BLOG_SETUP.md`** - Documentação técnica do blog

---

**✅ Tudo pronto! Agora é só escrever! 🚀**
