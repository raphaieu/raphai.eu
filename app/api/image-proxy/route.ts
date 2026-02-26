import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = [
  'www.notion.so',
  'notion.so',
  'files.notion.so',
  'secure.notion-static.com',
  'static.notion-static.com',
  'images.unsplash.com',
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'prod-files-secure.s3.amazonaws.com',
];

function isAllowedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (ALLOWED_HOSTS.includes(host)) return true;
    if (host.endsWith('.notion.so') || host.endsWith('.amazonaws.com')) return true;
    return false;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ error: 'Invalid or disallowed URL' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s server-side

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'raphai.eu-image-proxy/1.0',
      },
      next: { revalidate: 3600 },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const cacheControl = 'public, max-age=3600, s-maxage=3600'; // 1h

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      return NextResponse.json({ error: 'Timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Proxy error' }, { status: 502 });
  }
}
