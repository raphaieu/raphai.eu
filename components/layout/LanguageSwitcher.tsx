'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { events } from '@/lib/analytics';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  const handleChange = (locale: string) => {
    events.switchLanguage(locale);
    startTransition(() => {
      // Se estiver em um post específico (/blog/[slug]), ao trocar idioma
      // mandamos sempre para a listagem de posts no novo locale.
      // Isso evita erro de params e também o caso em que o mesmo slug não exista em outro idioma.
      const targetPath =
        pathname === '/blog/[slug]' ? '/blog' : (pathname as any);

      router.replace(targetPath as any, { locale } as any);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleChange('pt-br')}
        disabled={isPending}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
          currentLocale === 'pt-br'
            ? 'bg-[#004e64] text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <button
        onClick={() => handleChange('en-us')}
        disabled={isPending}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
          currentLocale === 'en-us'
            ? 'bg-[#004e64] text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
