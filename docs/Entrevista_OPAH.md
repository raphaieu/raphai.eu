# Guia de Entrevista — Opah / Genial Investimentos
React · WordPress · Migração de Sites · SEO Técnico | 100% remoto

---

## RH / Comportamental

### Trajetória e o que te trouxe até essa oportunidade
Essa vaga conecta skills que trabalhei formalmente durante boa parte da minha carreira. Fiz migrações de sites em Cold Fusion e ASP para WordPress — a primeira de um conglomerado de mais de 16 sites de turismo do Brasil para estrangeiros, a segunda de um portal de seguros que até hoje roda WordPress no core. No último ano desenvolvi um plugin de integração com Mercado Pago para uma faculdade como freela, o que me deu uma visão atualizada de como o WordPress está hoje. Tenho PHP forte na base, então normalmente atuo direto no código. Recentemente também desenvolvi um projeto de migração para WP via plugin para me atualizar nas práticas atuais.

### Trabalho em equipe — design, produto e marketing
Tenho bastante naturalidade com isso — boa parte da minha trajetória foi em agência, onde o contato direto com cliente, design e marketing era o dia a dia. No Grupo Casas Bahia trabalhava próximo ao time de marketing e analytics, traduzindo demandas de campanha em implementação técnica com prazo curto. Hoje construindo meus próprios produtos, acumulo os dois lados — sou o dev e o product owner ao mesmo tempo, então entendo a dor de quem especifica e de quem executa.

### Projetos próprios e foco remoto
Meus projetos pessoais estão em produção e na fase de crescimento, que toco fora do horário comercial. Na prática funcionam como laboratório — é onde testo tecnologias novas antes de aplicar em projetos de cliente. Trabalho remoto há anos e nunca foi um problema de entrega — o que me orienta é resultado, não presença física.

### Entrega sob pressão
No Grupo Casas Bahia fui alocado no time mobile para desenvolver o front de uma feature com prazo fechado. Não havia tempo para solicitar novos contratos de API — tive que mapear as rotas existentes por conta própria, entender os retornos e adaptar o front ao que tinha disponível. Aprendi AngularJS e TypeScript durante a execução, não antes. Entregamos no prazo e a feature foi premiada internamente.

### Onde se vê em 2 anos
Me vejo como um profissional cada vez mais orientado a produto e negócio, não só a código. A IA já mudou o como desenvolvemos — quem souber usar bem entrega mais rápido e com mais qualidade. Meu objetivo é ser o tipo de profissional que chega num projeto, entende o problema de negócio, propõe a solução certa e executa. Num contexto de consultoria isso tem valor direto: quanto mais autônomo e completo for o profissional alocado, menos fricção para o cliente.

### Por que essa oportunidade
Essa vaga conecta duas coisas que fazem parte da minha trajetória real: WordPress e migração de sites, onde tenho histórico concreto, e React, que estou usando ativamente nos meus projetos. O que me atrai é o perfil híbrido que a vaga pede — não é só codar componente, é pensar o projeto inteiro, da estrutura ao SEO. Isso é onde me encaixo naturalmente.

---

## Técnico — WordPress e Migração

### Migração real na prática
Me recordo mais do portal de seguros. Os maiores desafios foram a galeria de fotos e vídeos já existente e garantir a integridade dos dados durante a importação. Implementei um mecanismo de checkpoint — o script registrava o último ID processado, então em caso de timeout eu retomava de onde parou sem reprocessar o que já estava importado. A parte de mídia exigiu mais atenção na consistência dos dados após cada lote.

### Se fizesse hoje
Rodaria um lote pequeno para validar a consistência antes de escalar. Montaria o processo com filas para rodar em background de forma assíncrona, sem depender do browser ou de timeouts. Incluiria um mecanismo de rollback — não só para importar, mas para desfazer se algo der errado no meio do processo.

### Portal financeiro — preocupações
A preocupação central é transparência para o usuário final — a migração não pode ser percebida. Inventário completo do conteúdo, mapeamento de URLs indexadas com redirects 301 validados, cache em camadas (Redis + page cache + CDN), go-live fora do horário de pico, sempre com rollback planejado.

### Cache em camadas
Object cache com Redis para não repetir queries no banco, page cache para servir HTML estático sem executar PHP, e CDN para assets estáticos próximos ao usuário. Num portal financeiro com alto tráfego, essas três camadas juntas fazem diferença real de latência.

### Inventário de conteúdo
Exportaria tudo via WP-CLI ou direto no banco para ter números reais — quantos posts, quais status, quantas mídias órfãs, quais shortcodes em uso, quais plugins geram conteúdo dinâmico que pode quebrar. Com esse mapa, sento com o time de produto para definir data de corte e o que de fato migra.

### React + WordPress
A combinação mais limpa hoje é Headless — WordPress como CMS via REST API ou WPGraphQL, React no front com Next.js. Se é site existente com muito conteúdo e plugins dependentes do tema, a abordagem híbrida é menos arriscada. No caso de um portal como a Genial, eu avaliaria o que já existe antes de propor qualquer reescrita.

---

## Técnico — SEO

### Riscos de SEO numa migração
O principal risco é perder as referências das URLs já indexadas. Mapeamento completo de URLs antigas, redirects 301, reenvio ao Search Console, regeneração do sitemap, revisão de canonical URLs. E monitorar o Search Console por 30 a 60 dias após a migração para capturar 404s que escaparam.

### Reversão 1: "O que você faria na prática?"
Exportaria URLs indexadas via Search Console, cruzaria com tráfego no Analytics para identificar quais páginas não posso deixar quebrar. Crawl com Screaming Frog antes do go-live. Monitoramento diário por 30 dias. Num portal financeiro, perder posicionamento em termos como "como investir em CDB" tem impacto direto em aquisição — não é só SEO, é receita.

### Reversão 2: "500 URLs não mapeadas no crawl?"
Triaria por impacto — cruzaria com tráfego real no Search Console. A maioria provavelmente tem zero visita. As que têm tráfego viram prioridade imediata. Para padrões repetitivos, uma regra de rewrite no Nginx resolve em massa. Uma 404 customizada com busca interna minimiza o impacto para o usuário.

---

## Perguntas para o entrevistador

- Esse projeto é uma migração de ambiente existente ou construção do zero? Já tem diagnóstico do estado atual do WordPress?
- Qual é o prazo esperado e já tem escopo definido ou ainda está em fase de discovery?
- Com quem eu estaria trabalhando no dia a dia — tem time de produto e design estruturado no cliente ou seria mais autônomo?
- Essa alocação tem prazo definido ou é posição contínua? Existe possibilidade de evolução para outros projetos dentro da Opah?
- Vocês já mapearam os riscos de SEO da migração? Esse costuma ser o ponto mais crítico em portais com histórico longo de conteúdo indexado.

---

## Fio condutor — mentalidade para todas as respostas técnicas

1. Sempre triagem por impacto antes de agir
2. Sempre pensar em rollback e monitoramento pós go-live
3. Sempre conectar decisão técnica com impacto de negócio
4. Nunca propor reescrita sem entender o que existe primeiro

## Âncora WP moderno

"Trabalhei com WordPress desde o modelo clássico de temas PHP, fiz migrações de sistemas legados entendendo a estrutura interna do banco, e recentemente me atualizei na prática — explorei o FSE, a REST API e criei um bloco Gutenberg customizado em React. A essência continua a mesma, o ecossistema evoluiu."
