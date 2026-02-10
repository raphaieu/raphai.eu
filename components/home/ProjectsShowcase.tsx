'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { events } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ImageGallery from '@/components/ui/ImageGallery';

interface Project {
  name: string;
  description: string;
  status: string;
  tags: string[];
  featured: boolean;
  demo: string;
  highlights: string[];
  deployment?: string;
  screenshots?: { src: string; alt: string; caption: string }[];
}

export default function ProjectsShowcase() {
  const t = useTranslations('projects');
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt: string; caption: string }[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = (screenshots: { src: string; alt: string; caption: string }[]) => {
    setGalleryImages(screenshots);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  
  const projects: Project[] = [
    {
      name: t('items.rateiojusto.name'),
      description: t('items.rateiojusto.description'),
      status: t('status.production'),
      tags: ['Hono', 'TypeScript', 'Vercel', 'Turso DB', 'Clerk Auth', 'Google Places', 'Mercado Pago'],
      featured: false,
      demo: 'https://rateio.ckao.in',
      highlights: t.raw('items.rateiojusto.highlights'),
      deployment: t('items.rateiojusto.deployment'),
      screenshots: [
        { src: '/images/projects/rateio-justo/01-landing.png', alt: 'Landing Page', caption: 'Landing Page usuário deslogado' },
        { src: '/images/projects/rateio-justo/02-singin_singup.png', alt: 'Cadastro / Login Social', caption: 'Formulário de cadastro e login social com Clerk' },
        { src: '/images/projects/rateio-justo/03-dashboard.png', alt: 'Dashboard', caption: 'Dashboard do usuário logado, exibição de todos seus rateios' },
        { src: '/images/projects/rateio-justo/04-items.png', alt: 'Itens', caption: 'Lista de itens para divisão' },
        { src: '/images/projects/rateio-justo/05-location.png', alt: 'Localização', caption: 'Geolocalização via Google Places' },
        { src: '/images/projects/rateio-justo/06-people.png', alt: 'Pessoas', caption: 'Lista de pessoas para divisão' },
        { src: '/images/projects/rateio-justo/07-account_review.png', alt: 'Revisão da conta', caption: 'Revisão da conta para divisão' },
        { src: '/images/projects/rateio-justo/08-pix_payment.png', alt: 'Pagamento com PIX', caption: 'Pagamento via PIX com Mercado Pago para desbloquear Valores do Rateio por pessoa' },
        { src: '/images/projects/rateio-justo/09-account_values.png', alt: 'Valores por pessoa', caption: 'Valores da divisão da conta por pessoa, após confirmação de pagamento' },
        { src: '/images/projects/rateio-justo/10-split_blocked.png', alt: 'Rateio bloqueado', caption: 'Rateio bloqueado para evitar alterações após confirmação de pagamento' },
      ],
    },
    {
      name: t('items.dopacheck.name'),
      description: t('items.dopacheck.description'),
      status: t('status.production'),
      tags: ['Laravel 12', 'Laravel Filament', 'Vue 3', 'Tailwind CSS', 'MySQL', 'Redis', 'Stripe', 'WhatsApp (EvolutionAPI)', 'Docker'],
      featured: false,
      demo: 'https://dopacheck.com.br',
      highlights: t.raw('items.dopacheck.highlights'),
      deployment: t('items.dopacheck.deployment'),
      screenshots: [
        { src: '/images/projects/dopa-check/01-landing.png', alt: 'Landing Page', caption: 'Landing Page usuário deslogado' },
        { src: '/images/projects/dopa-check/02-dashboard.png', alt: 'Dashboard', caption: 'Dashboard com seus Desafios e Tarefas' },
        { src: '/images/projects/dopa-check/03-share.png', alt: 'Compartilhar', caption: 'Compartilhar nas redes a conclusão da suas tarefas do dia' },
        { src: '/images/projects/dopa-check/04-image_open.png', alt: 'Visualizar Imagem do Checkin', caption: 'Visualização da imagem que mandou como prova da conclusão da tarefa' },
        { src: '/images/projects/dopa-check/05-challenges.png', alt: 'Desafios', caption: 'Lista de desafios disponíveis' },
        { src: '/images/projects/dopa-check/06-challenge_details.png', alt: 'Detalhes do Desafio', caption: 'Detalhes do desafio, com descrição, participantes, progresso...' },
        { src: '/images/projects/dopa-check/07-challenge_participants.png', alt: 'Participantes do Desafio', caption: 'Lista de participantes do desafio' },
        { src: '/images/projects/dopa-check/08-dashboard_clean.png', alt: 'Dashboard Limpo', caption: 'Dashboard limpo, com apenas os desafios e tarefas do dia, sem nenhum check-in feito' },
        { src: '/images/projects/dopa-check/09-public_perfil.png', alt: 'Perfil Público', caption: 'Perfil público do usuário, com seus desafios e exibição das imagens dos check-ins' },
        { src: '/images/projects/dopa-check/10-report.png', alt: 'Relatório de Progresso do Desafio', caption: 'Relatório de Progresso do Desafio, com os check-ins feitos por dia participado' },
        { src: '/images/projects/dopa-check/11-singin_singup.png', alt: 'Cadastro / Login Social', caption: 'Formulário de cadastro e login social implementado com Google OAuth' },
        { src: '/images/projects/dopa-check/12-config.png', alt: 'Configurações do Perfil', caption: 'Configurações do Perfil do usuário, com nome, telefone, notificações, pagamentos...' },
        { src: '/images/projects/dopa-check/13-group_onboarding.png', alt: 'Onboarding para Desafio feito em Grupo do WhatsApp', caption: 'Onboarding para acesso aos desafios de um grupo do WhatsApp' },
        { src: '/images/projects/dopa-check/14-admin_group.png', alt: 'Administração dos Usuários do Grupo', caption: 'Administração dos usuários do grupo com Laravel Filament, com possibilidade de adicionar, remover e editar usuários e aprovação de usuários para participar do grupo' },
      ],
    },
    {
      name: t('items.tradychat.name'),
      description: t('items.tradychat.description'),
      status: t('status.mvp'),
      tags: ['Laravel 11', 'Vue 3', 'Laravel Reverb', 'NeuronAI', 'Node.js', 'Puppeteer', 'Stripe', 'Docker', 'GitHub Actions'],
      featured: false,
      demo: 'https://trady.chat',
      highlights: t.raw('items.tradychat.highlights'),
      deployment: t('items.tradychat.deployment'),
      screenshots: [
        { src: '/images/projects/trady-chat/01-landing.png', alt: 'Landing Page', caption: 'Landing Page exibindo o Ecossistema do Trady.chat' },
        { src: '/images/projects/trady-chat/02-journal.png', alt: 'Diário do Trader', caption: 'Diário do Trader, com exibição das configurações, gráficos de evolução e metas, opção para upload de notas de corretagem...' },
        { src: '/images/projects/trady-chat/03-journal_details.png', alt: 'Registro do Dia', caption: 'Onde você registra seu dia, via texto, ou áudio e anexa imagens da tomada de decisão' },
        { src: '/images/projects/trady-chat/04-smart_economic_calendar.png', alt: 'Calendário Econômico Inteligente', caption: 'Calendário Econômico Inteligente, com exibição dos eventos críticos, alertas e notificações e Análise do Evento com IA' },
        { src: '/images/projects/trady-chat/05-ia_explain.png', alt: 'Explicação do Evento com IA', caption: 'Explicação do Evento com IA, para tomada de decisão, para onde o mercado pode ir a depender do resultado do indicador / evento' },
      ],
    },
    {
      name: t('items.iassistente.name'),
      description: t('items.iassistente.description'),
      status: t('status.pivoted'),
      tags: ['Laravel', 'Evolution API', 'OpenAI', 'N8N', 'WhatsApp', 'AI Agents', 'Conceito'],
      featured: false,
      demo: '',
      highlights: t.raw('items.iassistente.highlights'),
      deployment: t('items.iassistente.deployment'),
    },
  ];

  return (
    <section id="projetos" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">
            {t('title')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                hover={true}
                className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#004e64' }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <Badge variant={project.featured ? 'primary' : 'success'}>
                    {project.status}
                  </Badge>
                </div>
                
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {project.deployment && (
                  <p className="text-sm text-gray-500 mb-6 flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                    {t('deploy')}: {project.deployment}
                  </p>
                )}

                {/* Highlights */}
                {project.highlights && (
                  <div className="mb-6 space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: '#004e64' }}></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.demo && project.demo.trim() !== '' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => events.viewProject(project.name)}
                      className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg bg-[#004e64] hover:bg-[#0066cc] transition-colors cursor-pointer"
                    >
                      <svg
                        className="mr-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {t('demo')}
                    </a>
                  )}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <button
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#004e64] hover:text-[#004e64] transition-colors cursor-pointer"
                      onClick={() => openGallery(project.screenshots!)}
                    >
                      <svg
                        className="mr-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {t('screenshots')}
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Image Gallery */}
      {isGalleryOpen && (
        <ImageGallery
          images={galleryImages}
          onClose={closeGallery}
          lightboxOnly={true}
          initialIndex={0}
        />
      )}
    </section>
  );
}
