'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { events } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Project {
  name: string;
  description: string;
  status: string;
  tags: string[];
  featured: boolean;
  demo: string;
  highlights: string[];
  deployment?: string;
}

export default function ProjectsShowcase() {
  const t = useTranslations('projects');
  
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
    },
    {
      name: t('items.dopacheck.name'),
      description: t('items.dopacheck.description'),
      status: t('status.production'),
      tags: ['Laravel 12', 'Vue 3', 'Tailwind CSS', 'MySQL', 'Redis', 'Stripe', 'WhatsApp API', 'Docker'],
      featured: false,
      demo: 'https://dopacheck.com.br',
      highlights: t.raw('items.dopacheck.highlights'),
      deployment: t('items.dopacheck.deployment'),
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
    },
    {
      name: t('items.iassistente.name'),
      description: t('items.iassistente.description'),
      status: t('status.pivoted'),
      tags: ['Laravel', 'Evolution API', 'OpenAI', 'N8N', 'WhatsApp', 'AI Agents', 'Conceito'],
      featured: false,
      demo: 'https://iassistente.online',
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
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => events.viewProject(project.name)}
                    className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg bg-[#004e64] hover:bg-[#0066cc] transition-colors"
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
                  <button
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#004e64] hover:text-[#004e64] transition-colors"
                    onClick={() => {
                      // Galeria será implementada aqui quando tiver screenshots
                      alert('Galeria de screenshots em breve!');
                    }}
                  >
                    {t('screenshots')}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
