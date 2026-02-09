# Implementação i18n (next-intl)

## ✅ Implementado

### 1. **Configuração Base**
- ✅ `next-intl@4.8.2` instalado
- ✅ `i18n/routing.ts` - Configuração de rotas e locales (pt-br, en-us)
- ✅ `i18n/request.ts` - Request config para SSR
- ✅ `middleware.ts` - Middleware para detecção de locale
- ✅ `next.config.ts` - Plugin next-intl configurado

### 2. **Estrutura de Pastas**
```
app/
├── layout.tsx              # Root layout (mínimo)
├── [locale]/              # Segmento dinâmico de locale
│   ├── layout.tsx         # Layout com i18n, fontes, metadata
│   └── page.tsx           # Homepage
```

### 3. **Arquivos de Mensagens**
- ✅ `messages/pt-br.json` - Português completo
- ✅ `messages/en-us.json` - Inglês completo

Estrutura:
- `nav` - Navegação (About, Skills, Projects, Contact)
- `hero` - Hero section (nome, slogan, CTAs)
- `about` - Seção Sobre (6 parágrafos)
- `skills` - Skills & Expertise (em progresso)
- `projects` - Projetos (em progresso)
- `contact` - Contato (título, descrição, botões)
- `footer` - Rodapé (manifesto, copyright)
- `whatsapp` - Tooltip do botão WhatsApp

### 4. **Componentes Atualizados**

#### ✅ Componentes de Layout
- **Header.tsx** - Navegação + LanguageSwitcher
- **Footer.tsx** - Manifesto + Copyright
- **LanguageSwitcher.tsx** (novo) - Botões PT/EN

#### ✅ Componentes Home
- **Hero.tsx** - Nome, slogan (inglês), CTAs, botão CV
- **About.tsx** - 6 parágrafos traduzidos (com HTML)
- **Contact.tsx** - Título, descrição, botões

#### 🔄 Pendentes (dados hardcoded)
- **Skills.tsx** - Skills categories + experience timeline
- **ProjectsShowcase.tsx** - Projects array com descriptions
- **WhatsAppButton.tsx** - Tooltip

### 5. **Language Switcher**
- Botões PT/EN no header desktop
- Dropdown no mobile menu
- Preserva pathname ao trocar idioma
- Visual feedback do locale ativo

## 🎯 Como Usar

### URLs
- `http://localhost:3000` → redireciona para `/pt-br`
- `http://localhost:3000/pt-br` → Português
- `http://localhost:3000/en-us` → English

### Trocar Idioma
1. Clique nos botões PT/EN no header
2. URL atualiza automaticamente
3. Conteúdo traduzido sem reload

## 📝 Notas Importantes

### Slogan Sempre em Inglês
O slogan "I enjoy creating tools that make life easier for people." permanece em inglês nos dois idiomas, conforme solicitado pelo cliente.

### HTML nas Traduções
Componentes como About usam `dangerouslySetInnerHTML` para renderizar tags `<strong>` e `<em>` das traduções:

```typescript
<p dangerouslySetInnerHTML={{ __html: t('intro') }} />
```

### Dados Hardcoded (Skills & Projects)
Skills e Projects ainda usam arrays hardcoded em PT-BR. Para traduzir:

**Opção 1: Mover para JSON**
```json
{
  "projects": {
    "items": [
      {
        "name": "Rateio Justo",
        "description": "...",
        "highlights": ["..."]
      }
    ]
  }
}
```

**Opção 2: Função de tradução inline**
```typescript
const projects = [
  {
    name: "Rateio Justo",
    description: t('projects.rateiojusto.description'),
    highlights: t('projects.rateiojusto.highlights', { returnObjects: true })
  }
];
```

## 🚧 Próximos Passos

### Para Finalizar i18n:
1. ✅ Traduzir Skills categories
2. ✅ Traduzir Projects data
3. ✅ Traduzir WhatsAppButton tooltip
4. ⚠️ Criar CV em inglês (`CV_Raphael_Martins_Software_Engineer.pdf`)
5. ⚠️ Atualizar link do CV no Hero baseado no locale

### Melhorias Opcionais:
- [ ] Detecção automática de idioma do browser
- [ ] Persistir escolha de idioma no localStorage
- [ ] Adicionar hreflang nas meta tags
- [ ] Criar sitemap com ambos os locales

## 🐛 Warnings Conhecidos

```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

Este warning é do Next.js 16.1.6 com Turbopack. O middleware do next-intl ainda usa a convenção antiga. Não afeta o funcionamento.

## 📚 Referências

- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [App Router Migration](https://next-intl-docs.vercel.app/docs/getting-started/app-router)
