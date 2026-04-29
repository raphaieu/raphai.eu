'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { events } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface Project {
  name: string;
  description: string;
  longDescription?: string;
  status?: string;
  tags: string[];
  featured: boolean;
  demo?: string;
  github?: string;
  githubLinks?: { label: string; href: string }[];
  highlights?: string[];
  deployment?: string;
}

export default function ProjectsShowcase() {
  const t = useTranslations('projects');
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const projects: Project[] = useMemo(() => [
    {
      name: t('items.personalhub.name'),
      description: t('items.personalhub.description'),
      longDescription: t('items.personalhub.longDescription'),
      status: t('status.production'),
      tags: ['PHP 8.4', 'Laravel 13', 'Blade', 'Livewire 4', 'PostgreSQL 17', 'Redis 7', 'MinIO', 'Node.js 24', 'Playwright', 'Evolution API', 'Docker', 'GitHub Actions', 'NeuronAI', 'Ollama', 'Groq', 'OpenAI', 'Anthropic'],
      featured: false,
      demo: 'https://api.raphael-martins.com/oportunidades',
      github: 'https://github.com/raphaieu/personal-hub',
      highlights: t.raw('items.personalhub.highlights'),
      deployment: t('items.personalhub.deployment'),
    },
    {
      name: t('items.dopacheck.name'),
      description: t('items.dopacheck.description'),
      longDescription: t('items.dopacheck.longDescription'),
      status: t('status.production'),
      tags: ['Laravel 12', 'Laravel Filament', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Redis', 'Stripe', 'WhatsApp', 'AI Vision', 'Docker', 'Mobile-first'],
      featured: false,
      demo: 'https://dopacheck.com.br',
      github: 'https://github.com/raphaieu/dopacheck.com.br',
      highlights: t.raw('items.dopacheck.highlights'),
      deployment: t('items.dopacheck.deployment'),
    },
    {
      name: t('items.rateiojusto.name'),
      description: t('items.rateiojusto.description'),
      longDescription: t('items.rateiojusto.longDescription'),
      status: t('status.production'),
      tags: ['Hono', 'TypeScript', 'Vercel', 'Turso DB', 'Clerk Auth', 'Google Places', 'Mercado Pago', 'OpenAI', 'Serverless', 'Mobile-first'],
      featured: false,
      demo: 'https://rateio.raphael-martins.com',
      github: 'https://github.com/raphaieu/rateio-web',
      highlights: t.raw('items.rateiojusto.highlights'),
      deployment: t('items.rateiojusto.deployment'),
    },
    {
      name: t('items.mkit.name'),
      description: t('items.mkit.description'),
      longDescription: t('items.mkit.longDescription'),
      status: t('status.production'),
      tags: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS v4', 'PWA', 'SSR', 'Laravel 13', 'PHP 8.3', 'MySQL 8', 'Redis', 'Sanctum', 'Socialite', 'Instagram Graph API', 'Docker', 'GitHub Actions', 'VPS'],
      featured: false,
      demo: 'https://mkit.com.br',
      githubLinks: [
        { label: 'mkit-web', href: 'https://github.com/raphaieu/mkit-web' },
        { label: 'mkit-api', href: 'https://github.com/raphaieu/mkit-api' },
      ],
      highlights: t.raw('items.mkit.highlights'),
      deployment: t('items.mkit.deployment'),
    },
    {
      name: t('items.tradychat.name'),
      description: t('items.tradychat.description'),
      longDescription: t('items.tradychat.longDescription'),
      status: t('status.paused'),
      tags: ['Next.js 15', 'React 19', 'TypeScript', 'shadcn/ui', 'Magic UI', 'Tailwind CSS', 'Laravel 13', 'PHP 8.3', 'Sanctum', 'Laravel Reverb', 'Node.js', 'Puppeteer', 'Docker', 'GitHub Actions', 'PostgreSQL', 'Redis', 'Chart.js', 'PWA'],
      featured: false,
      github: 'https://github.com/raphaieu/trady.chat',
      highlights: t.raw('items.tradychat.highlights'),
      deployment: t('items.tradychat.deployment'),
    },
    {
      name: t('items.investnews.name'),
      description: t('items.investnews.description'),
      longDescription: t('items.investnews.longDescription'),
      tags: ['Laravel 13', 'PHP 8.3', 'React 19', 'Tailwind CSS 4', 'Vite 8', 'MySQL 8', 'Redis 7', 'Horizon', 'Sanctum SPA', 'Laravel Reverb', 'Docker Compose', 'Repository Pattern'],
      featured: false,
      github: 'https://github.com/raphaieu/investnews',
    },
    {
      name: t('items.igcarousel.name'),
      description: t('items.igcarousel.description'),
      longDescription: t('items.igcarousel.longDescription'),
      status: t('status.production'),
      tags: ['Next.js', 'Vercel', 'shadcn/ui', 'OpenAI', 'Clerk', 'Carousel Generator', 'Tailwind CSS', 'Serverless', 'Email Delivery'],
      featured: false,
      demo: 'https://carousel.raphael-martins.com',
      github: 'https://github.com/raphaieu/igcarouselgenerator',
      highlights: t.raw('items.igcarousel.highlights'),
      deployment: t('items.igcarousel.deployment'),
    },
    {
      name: t('items.dfacaosocial.name'),
      description: t('items.dfacaosocial.description'),
      longDescription: t('items.dfacaosocial.longDescription'),
      status: t('status.production'),
      tags: ['Next.js', 'SlimPHP', 'Supabase', 'Vercel', 'Monorepo', 'Voluntary Project', 'Institutional'],
      featured: false,
      demo: 'https://www.dfacaosocial.ong.br/',
      github: 'https://github.com/raphaieu/dfacaosocial',
      highlights: t.raw('items.dfacaosocial.highlights'),
      deployment: t('items.dfacaosocial.deployment'),
    },
    {
      name: t('items.pequenosabordo.name'),
      description: t('items.pequenosabordo.description'),
      longDescription: t('items.pequenosabordo.longDescription'),
      status: t('status.production'),
      tags: ['Vue.js 3', 'Vite', 'Tailwind CSS', 'SlimPHP 4', 'MySQL', 'DomPDF', 'Swiper', 'AOS', 'CRUD Admin', 'PDF Contracts'],
      featured: false,
      demo: 'https://pequenosabordo.com.br',
      github: 'https://github.com/raphaieu/pequenosabordo.com.br',
      deployment: t('items.pequenosabordo.deployment'),
      highlights: t.raw('items.pequenosabordo.highlights'),
    },
    {
      name: t('items.cidabio.name'),
      description: t('items.cidabio.description'),
      longDescription: t('items.cidabio.longDescription'),
      status: t('status.paused'),
      tags: ['Static Site', 'Bio Site', 'Instagram Bio', 'Landing Page', 'Conversion'],
      featured: false,
      demo: 'https://cida.imb.br',
      github: 'https://github.com/raphaieu/cida-bio',
      deployment: t('items.cidabio.deployment'),
      highlights: t.raw('items.cidabio.highlights'),
    },
    {
      name: t('items.cidaimoveis.name'),
      description: t('items.cidaimoveis.description'),
      longDescription: t('items.cidaimoveis.longDescription'),
      status: t('status.paused'),
      tags: ['Nuxt', 'Laravel', 'SEO', 'Real Estate', 'Conversion', 'WhatsApp', 'Responsive'],
      featured: false,
      demo: 'https://cida.imb.br',
      github: 'https://github.com/raphaieu/cida.imb.br',
      highlights: t.raw('items.cidaimoveis.highlights'),
      deployment: t('items.cidaimoveis.deployment'),
    },
    {
      name: t('items.geradorcontratos.name'),
      description: t('items.geradorcontratos.description'),
      longDescription: t('items.geradorcontratos.longDescription'),
      status: t('status.paused'),
      tags: ['SlimPHP', 'Supabase', 'OpenAI Vision', 'Mobile-first', 'PDF', 'Document Automation', 'PropTech'],
      featured: false,
      github: 'https://github.com/raphaieu/gerador-contratos-imoveis',
      deployment: t('items.geradorcontratos.deployment'),
      highlights: t.raw('items.geradorcontratos.highlights'),
    },
    {
      name: t('items.cosmonumero.name'),
      description: t('items.cosmonumero.description'),
      longDescription: t('items.cosmonumero.longDescription'),
      status: t('status.paused'),
      tags: ['PHP 8.3', 'Vue.js 3', 'Tailwind CSS 3', 'SQLite', 'TCPDF', 'Mercado Pago', 'OpenAI', 'GitHub Actions', 'VPS'],
      featured: false,
      demo: 'https://ckao.in/cosmonumero/',
      github: 'https://github.com/raphaieu/cosmonumero',
      highlights: t.raw('items.cosmonumero.highlights'),
      deployment: t('items.cosmonumero.deployment'),
    }
  ], [t]);

  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [selectedProject]);

  const closeDialog = () => {
    setSelectedProjectIndex(null);
  };

  return (
    <section id="projetos" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">
            {t('title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                hover={true}
                className={`flex flex-col h-full ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                 <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#004e64' }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
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
                </div>

                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {project.tags.slice(0, 5).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="default">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 5 && (
                    <Badge variant="default">+{project.tags.length - 5}</Badge>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-auto cursor-pointer"
                  onClick={() => {
                    setSelectedProjectIndex(index);
                    events.viewProject(project.name);
                  }}
                >
                  Ver mais
                </Button>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        className="fixed inset-0 z-50 m-0 h-screen w-screen max-w-none max-h-none border-0 bg-transparent p-0 backdrop:bg-black/60"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {selectedProject && (
            <div className="w-full max-w-[900px] max-h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col cursor-pointer">
              <div className="p-6 sm:p-8 border-b border-gray-100 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {selectedProject.status && (
                      <Badge
                        variant={
                          selectedProject.status === t('status.production')
                            ? 'success'
                            : selectedProject.status === t('status.paused')
                              ? 'warning'
                              : selectedProject.status === t('status.finishing')
                                ? 'info'
                                : selectedProject.featured
                                  ? 'primary'
                                  : 'default'
                        }
                      >
                        {selectedProject.status}
                      </Badge>
                    )}
                    {selectedProject.deployment && (
                      <Badge variant="default">{selectedProject.deployment}</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                    {selectedProject.name}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="shrink-0 w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
                  aria-label="Fechar modal"
                >
                  ×
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      {t('highlights')}
                    </h4>
                    <ul className="grid gap-2">
                      {selectedProject.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-sm text-gray-700 flex gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#004e64] shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pb-1">
                  {selectedProject.demo && selectedProject.demo.trim() !== '' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm text-white font-medium rounded-lg bg-[#004e64] hover:bg-[#0066cc] transition-colors cursor-pointer"
                    >
                      {t('demo')}
                    </a>
                  )}
                {selectedProject.githubLinks && selectedProject.githubLinks.length > 0 ? (
                  selectedProject.githubLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#004e64] hover:text-[#004e64] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))
                ) : selectedProject.github && selectedProject.github.trim() !== '' && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#004e64] hover:text-[#004e64] transition-colors cursor-pointer"
                    >
                      {t('github')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
