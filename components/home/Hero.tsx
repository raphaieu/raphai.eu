'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import styles from '@/app/styles.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in order-2 lg:order-1">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4">
              <span className="block text-gray-900">{t('name')}</span>
              <span className={`block mt-2 ${styles.textGradient}`}>—</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-gray-500 tracking-wide mb-8">
              {t('role')}
            </p>
            <div className="mb-12">
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                {t('slogan_title')}
              </p>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t('slogan_subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
              <Button href="#projetos" variant="primary">
                {t('cta_projects')}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </Button>
              <Button href="#contato" variant="secondary">
                {t('cta_contact')}
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div className="animate-slide-in-right order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/raphaieu.jpeg"
                  alt="Raphael Martins"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#004e64]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-200/50 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
