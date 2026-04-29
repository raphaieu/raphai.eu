**Atividades:** Desenvolver e manter interfaces em React, administrar/customizar WordPress, planejar e executar migrações completas de sites (estrutura, conteúdo, URLs, SEO e performance), garantir integridade pós-migração, atuar com times de design, produto e tecnologia.

**Requisitos:** React sólido, WordPress (temas, plugins, customizações), migração de sites (item crítico), HTML/CSS/JS, SEO técnico.

**Modelo:** 100% remoto.

**P: Como você costuma trabalhar em equipe — design, produto e marketing?**

*"Tenho bastante naturalidade com isso — boa parte da minha trajetória foi em agência, onde o contato direto com cliente, design e marketing era o dia a dia. No Grupo Casas Bahia trabalhava próximo ao time de marketing e analytics, traduzindo demandas de campanha em implementação técnica com prazo curto. Hoje construindo meus próprios produtos, acumulo os dois lados — sou o dev e o product owner ao mesmo tempo, então entendo a dor de quem especifica e de quem executa."*

---

**P: Você tem projetos próprios rodando. Como garante foco e comprometimento com o cliente sendo 100% remoto?**

*"Meus projetos pessoais estão em produção e na fase de crescimento, que toco fora do horário comercial. Na prática funcionam como laboratório — é onde testo tecnologias novas antes de aplicar em projetos de cliente. Trabalho remoto há anos e nunca foi um problema de entrega — o que me orienta é resultado, não presença física."*

---

**P: Me fala de uma situação em que você entregou sob pressão com prazo apertado.**

*"No Grupo Casas Bahia fui alocado no time mobile para desenvolver o front de uma feature com prazo fechado. Não havia tempo para solicitar novos contratos de API ao backend — tive que mapear as rotas existentes por conta própria, entender os retornos e adaptar o front ao que tinha disponível. Aprendi AngularJS e TypeScript durante a execução, não antes. Entregamos no prazo e a feature foi premiada internamente."*

---

**P: Experiência com metodologias ágeis na prática?**

*"Tenho experiência prática com ambos. No Grupo Casas Bahia tive um treinamento formal de algumas semanas com uma consultoria especializada, e na Infracommerce usamos Scrum no dia a dia com sprints, dailies e retrospectivas. As retrospectivas eram as cerimônias que exigiam mais maturidade do time — é onde os atritos aparecem — mas é exatamente onde mais se aprende. Funcionou bem na prática."*

---

**P: Onde você se vê daqui a 2 anos?**

*"Me vejo como um profissional cada vez mais orientado a produto e negócio, não só a código. A IA já mudou o como desenvolvemos — quem souber usar bem entrega mais rápido e com mais qualidade. Meu objetivo é ser o tipo de profissional que chega num projeto, entende o problema de negócio, propõe a solução certa e executa — não só quem recebe tarefa e entrega ticket. Num contexto de consultoria isso tem valor direto: quanto mais autônomo e completo for o profissional alocado, menos fricção para o cliente."*

**P: Conte sobre sua trajetória e o que te trouxe até essa oportunidade.**

Essa vaga conecta skills que trabalhei formalmente durante boa parte da minha carreira. Fiz migrações de sites em Cold Fusion e ASP para WordPress — a primeira de um conglomerado de mais de 16 sites de turismo do Brasil para estrangeiros, a segunda de um portal de seguros que até hoje roda WordPress no core. No último ano ainda desenvolvi um plugin de integração com Mercado Pago para uma faculdade como freela, o que me deu uma visão atualizada de como o WordPress está hoje. Tenho PHP forte na base, então normalmente atuo direto no código ao invés de depender de plugins de terceiros — consigo entender a estrutura do banco e a lógica interna, inclusive de plugins. Recentemente também desenvolvi um projeto de migração para WP via plugin para me atualizar nas práticas atuais. *(enviar URL e repositório)*

---

**P: Me conta sobre como foi uma dessas migrações na prática — quais foram os maiores desafios?**

Me recordo mais do portal de seguros. Os maiores desafios foram a galeria de fotos e vídeos já existente e garantir a integridade dos dados durante a importação. Implementei um mecanismo de checkpoint — o script registrava o último ID processado, então em caso de timeout eu retomava de onde parou sem reprocessar o que já estava importado. As notícias foram mais tranquilas. A parte de mídia exigiu mais atenção na consistência dos dados após cada lote.

---

**P: Se você fosse fazer essa mesma migração hoje, o que faria diferente?**

Primeiro estudaria todo o processo de importação — o que precisa ser migrado e qual estrutura é necessária no destino. Rodaria um lote pequeno para validar a consistência antes de escalar. Depois montaria o processo com filas para rodar em background de forma assíncrona, sem depender do browser ou de timeouts. A depender da complexidade, complementaria com um script bash. E incluiria um mecanismo de rollback — não só para importar, mas para desfazer se algo der errado no meio do processo.

---

**P: Me conta sobre sua experiência com React.**

Tenho experiência com React em projetos próprios — no Trady.chat uso Next.js com React. Minha fluência maior é com Vue, mas o modelo mental de componentes, estado e ciclo de vida é o mesmo. Na prática, quando mudo de framework o que muda é sintaxe, não raciocínio. Com uma codebase existente para me basear, a curva é rápida.

---

**P: Qual sua experiência com SEO técnico? Me dá um exemplo prático.**

Aprendi SEO na prática logo no início da carreira, na migração do portal de turismo — o cliente era um dos pioneiros em SEO e SEM no Brasil. Aprendi as melhores práticas on-site e depois apliquei em escala no Grupo Casas Bahia. A essência continua a mesma: pesquisa de palavras-chave, hierarquia de headings, uso semântico de negrito e itálico, e as tags fundamentais — title, description, canonical URL, sitemap.xml.

---

**P: Numa migração de site, quais são os principais riscos para o SEO e como você mitiga?**

O principal risco é perder as referências das URLs já indexadas. A mitigação começa com o mapeamento completo de todas as URLs antigas e a implementação de redirects 301 para as novas. Além disso: reenviar as novas URLs para o Google Search Console, regenerar o sitemap, revisar as canonical URLs — especialmente se houver versão mobile separada ou app. E monitorar o Search Console por 30 a 60 dias após a migração para capturar eventuais 404 que escaparam do mapeamento.

---

**P: Por que você está buscando essa oportunidade?**

Essa vaga conecta duas coisas que fazem parte da minha trajetória real: WordPress e migração de sites, onde tenho histórico concreto, e React, que estou usando ativamente nos meus projetos. O que me atrai é justamente o perfil híbrido que a vaga pede — não é só codar componente, é pensar o projeto inteiro, da estrutura ao SEO. Isso é onde me encaixo naturalmente. E o modelo 100% remoto se alinha bem com a forma como trabalho hoje.

**P: Principais preocupações técnicas ao planejar migração/evolução do WordPress num portal financeiro?**

*"A preocupação central é transparência para o usuário final — a migração não pode ser percebida. Isso exige planejamento em camadas: primeiro um inventário completo do conteúdo — posts, categorias, tags, autores, mídias, shortcodes customizados — porque num portal financeiro é comum ter conteúdo gerado ao longo de anos com formatações inconsistentes que quebram na migração. Segundo, mapeamento de todas as URLs indexadas antes de qualquer movimento, com redirects 301 validados para não perder posicionamento — num domínio financeiro ranqueado isso é crítico. Terceiro, performance — cache em camadas, CDN, otimização de queries. E por último, go-live fora do horário de pico, sempre com rollback planejado."*

---

**P: O que você entende por cache em camadas no contexto WordPress?**

*"Cache em camadas significa atacar o problema em níveis: object cache com Redis para não repetir queries no banco, page cache para servir HTML estático sem executar PHP, e CDN para assets estáticos próximos ao usuário. Num portal financeiro com alto tráfego, essas três camadas juntas fazem diferença real de latência."*

---

**P: Como faria o inventário de conteúdo antes de planejar a migração?**

*"Antes de qualquer decisão, exportaria tudo via WP-CLI ou direto no banco para ter números reais — quantos posts, quais status, quantas mídias órfãs, quais shortcodes em uso, quais plugins geram conteúdo dinâmico que pode quebrar. Com esse mapa, sento com o time de produto para definir data de corte e o que de fato migra. Também avaliaria a relevância do conteúdo antigo — autores e categorias inexistentes podem ir para um perfil global, e conteúdo fora da janela de corte pode simplesmente não migrar. Tecnicamente dá para migrar tudo — a pergunta é se faz sentido para o produto."*

---

**P: Exemplos práticos de WP-CLI no processo de inventário e migração?**

*"WP-CLI permite mapear volume de posts, usuários, mídias e plugins direto no terminal sem desenvolver script do zero. O comando mais crítico numa migração é o `search-replace`, que faz a troca de URLs no banco inclusive em campos serializados — que é onde migração manual costuma quebrar se feita direto no MySQL."*

---

**P: Como enxerga a combinação React \+ WordPress na prática?**

*"Hoje a combinação mais limpa é Headless — WordPress como CMS via REST API ou WPGraphQL, React no front com Next.js. Mas a escolha depende do projeto: se é site novo, headless faz sentido. Se é site existente com muito conteúdo e plugins dependentes do tema, a abordagem híbrida é menos arriscada — você embeda React onde faz sentido sem reescrever tudo. No caso de um portal como a Genial, eu avaliaria o que já existe antes de propor qualquer reescrita."*

## **Perguntas para Fazer ao Entrevistador \+ Respostas de Reversão**

---

**Pergunta que você faz:** *"Esse projeto é uma migração de ambiente existente ou construção do zero? Já tem diagnóstico do estado atual do WordPress?"*

**Pergunta que você faz:** *"Qual é o prazo esperado e já tem escopo definido ou ainda está em fase de discovery?"*

**Pergunta que você faz:** *"Com quem eu estaria trabalhando no dia a dia — tem time de produto e design estruturado no cliente ou seria mais autônomo?"*

**Pergunta que você faz:** *"Essa alocação tem prazo definido ou é posição contínua? Existe possibilidade de evolução para outros projetos dentro da Opah?"*

**Pergunta que você faz — use se o Fábio estiver na sala:**

*"Olhando para o contexto de um portal financeiro, vocês já mapearam os riscos de SEO da migração? Esse costuma ser o ponto mais crítico em portais com histórico longo de conteúdo indexado."*

---

**Reversão 1 — "Boa pergunta sobre SEO, o que você faria na prática?"**

*"Primeiro entenderia o que já está ranqueado — exportaria todas as URLs indexadas via Google Search Console, cruzaria com o tráfego orgânico no Analytics para identificar quais páginas não posso deixar quebrar. Essas viram prioridade absoluta no mapeamento de redirects. Antes do go-live, rodaria um crawl completo com Screaming Frog para validar que todos os 301s estão respondendo. E no pós-migração, monitoraria o Search Console diariamente por 30 dias para capturar 404s que escaparam. Num portal financeiro, perder posicionamento em termos como 'como investir em CDB' tem impacto direto em aquisição — não é só SEO, é receita."*

---

**Reversão 2 — "E se encontrar 500 URLs não mapeadas no crawl?"**

*"Primeiro triaria por impacto — cruzaria as 500 URLs com tráfego real no Search Console. A maioria provavelmente tem zero visita. As que têm tráfego viram prioridade imediata. Para padrões de URL repetitivos, uma regra de rewrite no Nginx resolve em massa sem mapear uma a uma. E enquanto isso, uma 404 customizada com busca interna minimiza o impacto para o usuário que cair numa URL quebrada."*

---

**O fio condutor de todas as respostas técnicas:**

* Sempre triagem por impacto antes de agir  
* Sempre pensar em rollback e monitoramento pós go-live  
* Sempre conectar decisão técnica com impacto de negócio  
* Nunca propor reescrita sem entender o que existe primeiro

## **Resumo Final — Dicas Técnicas WP para Amanhã**

---

**FSE / Site Editor** O WordPress moderno substituiu `header.php`, `footer.php`, `single.php` por blocos gerenciados no Site Editor. O `theme.json` substituiu boa parte do `functions.php` para design tokens — cores, tipografia, espaçamentos. O dev define os limites, o editor tem liberdade dentro deles.

---

**Gutenberg — edit.js vs save.js** `edit.js` é o que aparece no editor admin — React puro. `save.js` é o HTML que vai pro banco e aparece no front. Para blocos dinâmicos com dados em tempo real, `save.js` retorna `null` e o render é feito via `render.php` — sem duplicação de código.

---

**Patterns vs Blocos React** Patterns são arranjos de blocos nativos sem código — para seções hero, banners, layouts repetitivos. Bloco React customizado só quando precisa de interatividade, estado ou integração com API externa.

---

**REST API** `/wp-json/wp/v2/posts` — JSON bidirecional, dá para ler e escrever. É o que alimenta um front React headless consumindo WP como CMS.

---

**Migração — sua experiência real** Migração opera na camada de dados, independe de tema ou editor. Para migrações de sistemas legados (não WP para WP), você gerava o conteúdo compatível e inseria via `wp_insert_post()` ou direto no MySQL — isso exige entender a estrutura interna do WP (`wp_posts`, `wp_postmeta`, `wp_terms`) de verdade, não só usar ferramentas prontas. O único ponto de atenção em WP moderno é conteúdo legado de editor clássico que chega como HTML bruto — funciona, mas não vira bloco Gutenberg automaticamente.

---

**WP-CLI — comandos que você usou hoje**

bash  
wp core install       \# instalação via terminal  
wp option get/update  \# lê e altera configurações  
wp rewrite structure  \# define estrutura de permalinks  
wp rewrite flush      \# limpa cache de rewrite rules  
wp plugin list        \# lista plugins  
wp search-replace     \# troca URLs no banco inclusive em campos serializados  
---

**Como amarrar tudo amanhã se perguntarem WP moderno:**

*"Trabalhei com WordPress desde o modelo clássico de temas PHP, fiz migrações de sistemas legados entendendo a estrutura interna do banco, e ontem atualizei na prática — explorei o FSE, a REST API e criei um bloco Gutenberg customizado em React. A essência continua a mesma, o ecossistema evoluiu."*

