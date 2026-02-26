import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Notion (e principalmente URLs assinadas do S3) costuma falhar no otimizador do Next
    // por timeout/redirect. Com isso, as imagens são servidas direto pelo browser.
    unoptimized: true,
    remotePatterns: [
      // Notion image proxy
      { protocol: 'https', hostname: 'www.notion.so', pathname: '/**' },
      { protocol: 'https', hostname: 'notion.so', pathname: '/**' },
      { protocol: 'https', hostname: '**.notion.so', pathname: '/**' },
      { protocol: 'https', hostname: 'files.notion.so', pathname: '/**' },
      { protocol: 'https', hostname: 'secure.notion-static.com', pathname: '/**' },
      { protocol: 'https', hostname: 'static.notion-static.com', pathname: '/**' },

      // Notion secure file storage (comum em covers/uploads)
      { protocol: 'https', hostname: '**.amazonaws.com', pathname: '/**' },

      // Fontes comuns de imagens externas (caso você use no Notion)
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default withNextIntl(nextConfig);
