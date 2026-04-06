'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function About() {
  const t = useTranslations('about');
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-12 text-center">
            {t('title')}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
            <p className="text-xl font-medium">{t('intro')}</p>
            <p className="text-lg">{t('work')}</p>
            <p className="text-lg">{t('skills')}</p>
            <p className="text-lg">{t('experience')}</p>
            <p className="text-lg">{t('products')}</p>
            <p className="text-lg">{t('freelance')}</p>
            <p className="text-lg">{t('trading')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
