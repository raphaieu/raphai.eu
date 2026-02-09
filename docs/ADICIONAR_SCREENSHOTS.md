# Como Adicionar Screenshots dos Projetos

## 📁 Estrutura de Pastas

Crie a seguinte estrutura dentro de `public/images/projects/`:

```
public/images/projects/
├── rateio-justo/
│   ├── 01-dashboard.jpg
│   ├── 02-split.jpg
│   ├── 03-geolocation.jpg
│   ├── 04-payment.jpg
│   └── 05-result.jpg
│
├── dopa-check/
│   ├── 01-dashboard.jpg
│   ├── 02-checkin.jpg
│   ├── 03-progress.jpg
│   ├── 04-challenges.jpg
│   └── 05-whatsapp.jpg
│
└── trady-chat/
    ├── 01-diary.jpg
    ├── 02-calendar.jpg
    ├── 03-calendar-ai.jpg
    ├── 04-quotes.jpg
    ├── 05-alerts.jpg
    └── 06-overview.jpg
```

## 📸 Especificações das Imagens

### Dimensões Recomendadas
- **Largura**: 1920px (ou 1600px)
- **Altura**: 1080px (16:9) ou 1200px (4:3)
- **Formato**: JPG ou WebP
- **Qualidade**: 80-85% (balance entre qualidade e tamanho)
- **Tamanho máximo**: 300-500 KB por imagem

### Ferramentas para Otimizar
- [TinyPNG](https://tinypng.com/) - Compressão automática
- [Squoosh](https://squoosh.app/) - Compressão e conversão
- Chrome DevTools - Captura de screenshots responsivos

## 🎯 Screenshots por Projeto

### Rateio Justo (5 imagens)
1. **Dashboard** - Tela inicial com lista de rateios
2. **Split** - Tela de divisão com itens
3. **Geolocation** - Google Places em ação
4. **Payment** - Tela de pagamento PIX
5. **Result** - Resultado final com link compartilhável

### DOPA Check (5 imagens)
1. **Dashboard** - Dashboard principal com métricas
2. **Check-in** - Tela de check-in (web ou WhatsApp)
3. **Progress** - Visualização de progresso (streaks)
4. **Challenges** - Lista de desafios disponíveis
5. **WhatsApp** - Integração WhatsApp em ação

### Trady.chat (6 imagens)
1. **Diary** - Diário do trader com narração
2. **Calendar** - Calendário econômico principal
3. **Calendar AI** - Análise de IA de um evento
4. **Quotes** - Grade de cotações em tempo real
5. **Alerts** - Sistema de alertas 5min antes
6. **Overview** - Panorama geral do dia

## 💻 Como Implementar no Código

Após adicionar as imagens, atualize o componente `ProjectsShowcase.tsx`:

```typescript
const projects = [
  {
    name: 'Rateio Justo',
    // ... resto do projeto
    screenshots: [
      { src: '/images/projects/rateio-justo/01-dashboard.jpg', alt: 'Dashboard', caption: 'Tela principal do Rateio Justo' },
      { src: '/images/projects/rateio-justo/02-split.jpg', alt: 'Divisão', caption: 'Divisão item a item' },
      { src: '/images/projects/rateio-justo/03-geolocation.jpg', alt: 'Geolocalização', caption: 'Google Places integrado' },
      { src: '/images/projects/rateio-justo/04-payment.jpg', alt: 'Pagamento', caption: 'Pagamento via PIX' },
      { src: '/images/projects/rateio-justo/05-result.jpg', alt: 'Resultado', caption: 'Resultado final' },
    ],
  },
  // ... outros projetos
];
```

E no card, substitua o alert por:

```typescript
<button
  onClick={() => openGallery(project.screenshots)}
  className="..."
>
  Ver screenshots
</button>
```

## 🎨 Dicas de Captura

### Screenshots Eficazes
1. **Use dados reais** (não lorem ipsum)
2. **Destaque a funcionalidade** principal
3. **Capture interações** importantes (hover, tooltips)
4. **Mostre mobile E desktop** se relevante
5. **Use modo incógnito** (sem extensões/distrações)

### Chrome DevTools
```
1. F12 → Device Toolbar (Ctrl+Shift+M)
2. Escolha dispositivo (iPhone 12, Desktop HD)
3. Ctrl+Shift+P → "Capture screenshot" ou "Capture full size screenshot"
4. Salvar e otimizar
```

## ✅ Checklist

Antes de adicionar as screenshots:
- [ ] Remover dados sensíveis
- [ ] Usar conta de teste/demo
- [ ] Verificar qualidade visual
- [ ] Otimizar tamanho do arquivo
- [ ] Renomear com padrão: `01-nome.jpg`

Após adicionar:
- [ ] Testar galeria/lightbox
- [ ] Verificar responsividade
- [ ] Confirmar lazy loading
- [ ] Testar navegação (← → ESC)

## 🚀 Próximos Passos

1. Capture os screenshots
2. Otimize as imagens
3. Adicione na pasta correta
4. Atualize o código com os paths
5. Teste a galeria
6. Deploy na Vercel!

---

**Nota**: A galeria (ImageGallery.tsx) já está implementada e pronta para uso. Só falta adicionar as imagens e conectar nos cards dos projetos.
