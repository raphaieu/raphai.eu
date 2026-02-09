'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { events } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

export default function Contact() {
  const t = useTranslations('contact');
  return (
    <section id="contato" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:contato@raphai.eu"
              onClick={events.clickEmail}
              className="inline-flex items-center px-8 py-4 bg-[#004e64] text-white font-medium rounded-full hover:bg-[#0066cc] transition-all duration-300 hover-lift"
            >
              <svg
                className="mr-3 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t('email')}
            </a>
            <a
              href="https://linkedin.com/in/raphaieu"
              target="_blank"
              rel="noopener noreferrer"
              onClick={events.clickLinkedIn}
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-[#004e64] hover:text-[#004e64] transition-all duration-300 hover-lift"
            >
              <svg
                className="mr-3 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t('linkedin')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
