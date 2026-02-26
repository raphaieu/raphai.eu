'use client';

import { useTranslations } from 'next-intl';
import Script from 'next/script';

/**
 * Comentários via Cusdis (leve, sem ads, nome + e-mail para comentar).
 * Qualquer pessoa pode comentar sem precisar de conta GitHub.
 *
 * Para ativar: crie um site em https://cusdis.com e configure no .env.local:
 *   NEXT_PUBLIC_CUSDIS_APP_ID=seu-app-id
 *   NEXT_PUBLIC_CUSDIS_HOST=https://cusdis.com (opcional; use se self-hosted)
 */
const APP_ID = process.env.NEXT_PUBLIC_CUSDIS_APP_ID;
const HOST = process.env.NEXT_PUBLIC_CUSDIS_HOST || 'https://cusdis.com';

interface BlogCommentsProps {
  locale: string;
  /** Identificador único da página (ex.: slug do post) */
  pageId?: string;
  /** URL canônica da página */
  pageUrl?: string;
  /** Título da página */
  pageTitle?: string;
}

export default function BlogComments({
  locale,
  pageId,
  pageUrl,
  pageTitle,
}: BlogCommentsProps) {
  const t = useTranslations('blog');

  const enabled = APP_ID && pageId;

  if (!APP_ID) {
    return (
      <section className="mt-12 pt-8 border-t border-gray-200" aria-label={t('comments')}>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('comments')}</h2>
        <p className="text-sm text-gray-500">{t('commentsSetup')}</p>
      </section>
    );
  }

  if (!pageId) {
    return null;
  }

  const lang = locale === 'pt-br' ? 'pt' : 'en';

  return (
    <section className="mt-12 pt-8 border-t border-gray-200" aria-label={t('comments')}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('comments')}</h2>
      <div
        id="cusdis_thread"
        data-host={HOST}
        data-app-id={APP_ID}
        data-page-id={pageId}
        data-page-url={pageUrl || ''}
        data-page-title={pageTitle || ''}
        data-lang={lang}
        className="min-h-[120px]"
      />
      <Script
        src={`${HOST.replace(/\/$/, '')}/js/cusdis.es.js`}
        strategy="lazyOnload"
        async
        defer
      />
    </section>
  );
}
