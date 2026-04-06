'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Badge from '@/components/ui/Badge';

export default function Skills() {
  const t = useTranslations('skills');
  const skillCategories = [
    {
      title: t('categories.backend'),
      skills: ['PHP 8.x', 'Laravel 11/12', 'Node.js', 'Hono', 'TypeScript', 'REST APIs', 'WebSockets', 'SOAP', 'Webhooks', 'Queues/Jobs', 'JWT/Sanctum'],
    },
    {
      title: t('categories.frontend'),
      skills: ['Vue 3', 'Nuxt 3', 'Next.js', 'React', 'Inertia.js', 'Composition API', 'Tailwind CSS', 'AngularJS', 'jQuery', 'JavaScript ES6+'],
    },
    {
      title: t('categories.ai'),
      skills: ['Cursor', 'Claude API', 'OpenAI API', 'NeuronAI', 'N8N', 'Evolution API', 'AI Agents', 'LLM Integration', 'Web Scraping', 'Vibe Coding'],
    },
    {
      title: t('categories.database'),
      skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'Turso (SQLite)', 'Redis', 'Eloquent ORM', 'Query Optimization'],
    },
    {
      title: t('categories.cloud'),
      skills: ['Docker', 'Kubernetes', 'Vercel', 'AWS', 'Azure', 'GCP', 'VPS Linux', 'GitHub Actions', 'Cloudflare', 'Terraform'],
    },
    {
      title: t('categories.seo'),
      skills: ['Google Tag Manager', 'GA4/DataLayer', 'Adobe Analytics', 'SEO Técnico', 'Custom Tag Manager', 'Performance Web'],
    },
    {
      title: t('categories.auth'),
      skills: ['Clerk', 'Stripe Cashier', 'Mercado Pago PIX', 'Google OAuth', 'Laravel Sanctum', 'JWT'],
    },
    {
      title: t('categories.ecommerce'),
      skills: ['OpenCart', 'WordPress', 'WooCommerce', 'Mailchimp', 'Instagram Graph API', 'WhatsApp API', 'ERP Integrations'],
    },
    {
      title: t('categories.trading'),
      skills: ['MQL5', 'MetaTrader 5', 'Forex/B3', 'Economic Calendar', 'Trading Bots', 'Real-time Quotes'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">
            {t('title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Approaches */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('architectures.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#004e64' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('architectures.serverless.title')}</h4>
                <p className="text-sm text-gray-600">{t('architectures.serverless.desc')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('architectures.serverless.project')}</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#004e64' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('architectures.docker.title')}</h4>
                <p className="text-sm text-gray-600">{t('architectures.docker.desc')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('architectures.docker.project')}</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#004e64' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('architectures.cicd.title')}</h4>
                <p className="text-sm text-gray-600">{t('architectures.cicd.desc')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('architectures.cicd.project')}</p>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('experience.title')}
            </h3>
            <div className="space-y-6">
              {t.raw('experience.items').map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#004e64' }}></div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.company}</p>
                    <p className="text-sm text-gray-500 mb-1">{item.period}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('formation.title')}
            </h3>
            <div className="space-y-6">
              {t.raw('formation.items').map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#004e64' }}></div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      {item.institution} · {item.period}
                    </p>
                    {item.description && (
                      <p className="text-gray-600">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center italic">
              {t('formation.complementary')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
