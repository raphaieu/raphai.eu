/**
 * Retorna a URL da imagem passando pelo proxy do nosso servidor quando a origem
 * é Notion/S3, evitando timeout e CORS no client (LCP e capas).
 */
const PROXY_HOSTS = [
  'www.notion.so',
  'notion.so',
  'files.notion.so',
  'secure.notion-static.com',
  'static.notion-static.com',
  'images.unsplash.com',
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'prod-files-secure.s3.amazonaws.com',
];

export function getProxiedImageUrl(url: string | undefined): string {
  if (!url) return '';
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const useProxy =
      PROXY_HOSTS.some((h) => host === h) ||
      host.endsWith('.notion.so') ||
      host.endsWith('.amazonaws.com');
    if (useProxy) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
  } catch {
    // ignore
  }
  return url;
}
