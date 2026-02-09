# raphai.eu

Site pessoal e profissional de Raphael Martins - Software Engineer & Maker.

🌐 **Live**: [raphai.eu](https://raphai.eu)

---

## 🚀 Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API (Blog)
- **i18n**: next-intl (PT-BR, EN-US)
- **Analytics**: Google Analytics 4 + Vercel Analytics
- **Deploy**: Vercel

## 📁 Estrutura

```
raphai.eu/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Rotas internacionalizadas
│   │   ├── page.tsx      # Home / BIO
│   │   ├── projetos/     # Showcase de projetos
│   │   └── blog/         # Blog (Notion)
│   ├── sitemap.ts        # Sitemap automático
│   └── robots.ts         # Robots.txt
├── components/            # React Components
├── lib/                  # Utilities & Helpers
├── messages/             # Traduções (pt-br.json, en-us.json)
├── public/               # Assets estáticos
├── docs/                 # Documentação técnica
└── styles/               # CSS global
```

## 🛠️ Setup Local

### Prerequisites

- Node.js 20+
- Bun (ou npm/pnpm)
- Notion account (para blog)

### Installation

```bash
# Clone o repositório
git clone git@github.com:raphaieu/raphai.eu.git
cd raphai.eu

# Instalar dependências
bun install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Rodar em desenvolvimento
bun run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Environment Variables

```bash
# Notion
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-VDYG8GFRG0
```

Ver guia completo em [`docs/NOTION_SETUP.md`](docs/NOTION_SETUP.md)

## 📚 Documentação

Toda a documentação técnica está na pasta [`docs/`](docs/):

- [**STACK_TECNICA.md**](docs/STACK_TECNICA.md) - Tecnologias e dependências
- [**ARQUITETURA.md**](docs/ARQUITETURA.md) - Estrutura e fluxos
- [**CONTEUDO.md**](docs/CONTEUDO.md) - Mapeamento de conteúdo
- [**PROJETOS.md**](docs/PROJETOS.md) - Detalhes dos projetos
- [**NOTION_SETUP.md**](docs/NOTION_SETUP.md) - Integração com Notion
- [**SEO_ANALYTICS.md**](docs/SEO_ANALYTICS.md) - SEO e analytics
- [**DESIGN_SYSTEM.md**](docs/DESIGN_SYSTEM.md) - Design system
- [**ROADMAP.md**](docs/ROADMAP.md) - Plano de implementação

## 🎨 Features

- ✅ Site BIO completo (Hero, Sobre, Manifesto, Contato)
- ✅ Showcase de projetos
- ✅ Blog integrado com Notion
- ✅ Multilanguage (PT-BR ⟷ EN-US)
- ✅ SEO otimizado
- ✅ Google Analytics + Vercel Analytics
- ✅ Mobile-first & Responsive
- ✅ Performance (Lighthouse 100/100)

## 🚢 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte com Vercel
3. Configure environment variables
4. Deploy automático!

```bash
# Build de produção
bun run build

# Rodar build local
bun run start
```

## 📊 Performance

- **Lighthouse**: 100/100 (todas categorias)
- **LCP**: < 2.0s
- **FCP**: < 1.0s
- **TTI**: < 2.5s
- **CLS**: < 0.1

## 🤝 Contributing

Este é um projeto pessoal, mas sugestões são bem-vindas!

## 📝 License

MIT License - veja [LICENSE.md](LICENSE.md)

---

**Criado com ❤️ por [Raphael Martins](https://raphai.eu)**

*Crafting clarity. Building freedom.*
