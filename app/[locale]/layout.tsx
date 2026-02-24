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
    ? 'Raphael Martins - Software Engineer'
    : 'Raphael Martins - Engenheiro de Software';
  const siteDescription = isEnglish
    ? 'Software engineer creating tools that make life easier for people. Expert in Laravel, Vue.js, and modern architectures.'
    : 'Sistemas escaláveis e soluções digitais sob medida';
  const shareDescription = isEnglish
    ? 'Creating tools that make life easier for people.'
    : 'Sistemas escaláveis e soluções digitais sob medida';

  return {
    metadataBase: new URL('https://raphai.eu'),
    title: {
      default: siteTitle,
      template: '%s | Raphael Martins',
    },
    description: siteDescription,
    keywords: [
      'Raphael Martins',
      'Software Engineer',
      'Full Stack Developer',
      'Laravel',
      'Vue.js',
      'Next.js',
      'TypeScript',
      'Hono',
      'Serverless',
      'Trading',
      'DevOps',
      'Cursor',
      'Vibe Coding',
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
              name: 'Raphael Martins',
              url: 'https://raphai.eu',
              image: 'https://raphai.eu/images/raphaieu.jpeg',
              sameAs: [
                'https://www.linkedin.com/in/raphaelmartins/',
                'https://github.com/raphaieu',
              ],
              jobTitle: 'Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelancer',
              },
              alumniOf: 'The Cloud Bootcamp',
              knowsAbout: [
                'PHP',
                'Laravel',
                'Vue.js',
                'TypeScript',
                'Next.js',
                'Hono',
                'Serverless',
                'Docker',
                'AWS',
                'Vercel',
              ],
              description:
                locale === 'en-us'
                  ? 'Software engineer creating tools that make life easier for people.'
                  : 'Sistemas escaláveis e soluções digitais sob medida',
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
