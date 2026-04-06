import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en-us';
  const siteTitle = isEnglish
    ? 'Raphael Martins - Senior Full Stack Software Engineer | Laravel · Vue/Nuxt · AI'
    : 'Raphael Martins - Engenheiro de Software Sênior Full Stack | Laravel · Vue/Nuxt · IA';
  const siteDescription = isEnglish
    ? 'Senior Full Stack Software Engineer with 20+ years of experience. Expert in Laravel, Vue.js/Nuxt 3, TypeScript, SaaS, high-traffic e-commerce, and AI integration. Available for remote projects.'
    : 'Engenheiro de Software Full Stack Sênior com +20 anos de experiência. Especialista em Laravel, Vue.js/Nuxt 3, TypeScript, SaaS, e-commerce de alto tráfego e integração com IA. Disponível para projetos remotos.';
  const shareDescription = isEnglish
    ? 'Senior Software Engineer — SaaS, e-commerce, AI integration. Laravel, Vue/Nuxt, TypeScript. 20+ years of experience.'
    : 'Engenheiro de Software Sênior — SaaS, e-commerce, integração com IA. Laravel, Vue/Nuxt, TypeScript. +20 anos de experiência.';

  return {
    metadataBase: new URL('https://raphai.eu'),
    title: {
      default: siteTitle,
      template: '%s | Raphael Martins',
    },
    description: siteDescription,
    keywords: [
      'Raphael Martins',
      'Engenheiro de Software',
      'Software Engineer',
      'Full Stack Developer',
      'Senior Developer',
      'Laravel',
      'PHP',
      'Vue.js',
      'Nuxt 3',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Hono',
      'REST API',
      'SaaS',
      'E-commerce',
      'Serverless',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'GCP',
      'DevOps',
      'AI Integration',
      'OpenAI',
      'Claude',
      'Web Scraping',
      'Trading',
      'MQL5',
      'Salvador BA',
      'Brasil',
      'Remote Developer',
    ],
    authors: [{ name: 'Raphael Martins', url: 'https://raphai.eu' }],
    creator: 'Raphael Martins',
    publisher: 'Raphael Martins',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `https://raphai.eu/${locale}`,
      languages: {
        'pt-BR': 'https://raphai.eu/pt-br',
        'en-US': 'https://raphai.eu/en-us',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en-us' ? 'en_US' : 'pt_BR',
      alternateLocale: locale === 'en-us' ? ['pt_BR'] : ['en_US'],
      url: `https://raphai.eu/${locale}`,
      siteName: 'Raphael Martins',
      title: siteTitle,
      description: shareDescription,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Raphael Martins',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: shareDescription,
      images: ['/images/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  };
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VDYG8GFRG0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VDYG8GFRG0', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Raphael dos Santos Martins',
              alternateName: 'Raphael Martins',
              url: 'https://raphai.eu',
              image: 'https://raphai.eu/images/raphaieu.jpeg',
              sameAs: [
                'https://www.linkedin.com/in/raphaelmartins/',
                'https://github.com/raphaieu',
                'https://raphael-martins.com',
              ],
              jobTitle: locale === 'en-us'
                ? 'Senior Full Stack Software Engineer'
                : 'Engenheiro de Software Sênior Full Stack',
              worksFor: {
                '@type': 'Organization',
                name: 'Raphael-Martins.com',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Salvador',
                addressRegion: 'BA',
                addressCountry: 'BR',
              },
              alumniOf: [
                {
                  '@type': 'EducationalOrganization',
                  name: 'Unijorge',
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'The Cloud Bootcamp',
                },
              ],
              knowsAbout: [
                'PHP', 'Laravel', 'Vue.js', 'Nuxt 3', 'TypeScript',
                'Next.js', 'React', 'Node.js', 'Hono', 'REST API',
                'SOAP', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
                'Serverless', 'Vercel', 'PostgreSQL', 'MySQL', 'Redis',
                'AI Integration', 'OpenAI', 'Claude', 'Web Scraping',
                'SEO', 'Google Tag Manager', 'E-commerce', 'SaaS',
                'MQL5', 'MetaTrader 5', 'GitHub Actions', 'Terraform',
              ],
              description:
                locale === 'en-us'
                  ? 'Senior Full Stack Software Engineer with 20+ years of experience in web applications, SaaS platforms, and high-traffic e-commerce. Expert in Laravel, Vue.js/Nuxt 3, TypeScript, and AI integration.'
                  : 'Engenheiro de Software Full Stack Sênior com +20 anos de experiência em aplicações web, plataformas SaaS e e-commerces de alto tráfego. Especialista em Laravel, Vue.js/Nuxt 3, TypeScript e integração com IA.',
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-white text-gray-900 font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
