'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { events } from '@/lib/analytics';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect bg-white/80 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + CV Button */}
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display font-semibold text-xl cursor-pointer">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #004e64 0%, #0066cc 100%)',
                }}
              >
                RM
              </span>
            </Link>
            <a
              href="/CV_Raphael_Martins_Engenheiro_Fullstack.pdf"
              download
              onClick={events.downloadCV}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:border-[#004e64] hover:text-[#004e64] transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('hero.cta_cv')}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-8">
              <a
                href="/#projetos"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
              >
                {t('nav.projects')}
              </a>
              <a
                href="/#sobre"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
              >
                {t('nav.about')}
              </a>
              <a
                href="/#skills"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
              >
                {t('nav.skills')}
              </a>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
              >
                {t('nav.blog')}
              </Link>
              <a
                href="/#contato"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
              >
                {t('nav.contact')}
              </a>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/#projetos"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.projects')}
              </a>
              <a
                href="/#sobre"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              <a
                href="/#skills"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.skills')}
              </a>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              <a
                href="/#contato"
                className="text-gray-600 hover:text-[#004e64] transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
              <div className="pt-4 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
