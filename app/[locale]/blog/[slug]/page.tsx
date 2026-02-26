import { getBlogPostBySlug, getAllPostSlugs, getPageContent } from '@/lib/notion';
import { getProxiedImageUrl } from '@/lib/image-proxy';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogComments from '@/components/blog/BlogComments';

// Revalidate every hour
export const revalidate = 3600;

// Helper to get text from rich_text array
function getRichText(richTextArray: any[]) {
  if (!richTextArray || richTextArray.length === 0) return '';
  return richTextArray.map(text => text.plain_text).join('');
}

function getFileOrExternalUrl(fileOrExternal: any): string | null {
  if (!fileOrExternal) return null;
  if (fileOrExternal.type === 'external') return fileOrExternal.external?.url || null;
  if (fileOrExternal.type === 'file') return fileOrExternal.file?.url || null;
  return null;
}

function toEmbeddableUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (host === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    // ignore
  }

  return url;
}

function looksLikeVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.includes('youtube.com') ||
    lower.includes('youtu.be') ||
    lower.includes('vimeo.com')
  );
}

// Simple block renderer
function renderBlock(block: any) {
  const { type } = block;

  switch (type) {
    case 'paragraph':
      const paragraphText = getRichText(block.paragraph?.rich_text);
      return paragraphText ? <p className="mb-4">{paragraphText}</p> : null;
    
    case 'heading_1':
      return <h1 className="text-3xl font-bold mt-8 mb-4">{getRichText(block.heading_1?.rich_text)}</h1>;
    
    case 'heading_2':
      return <h2 className="text-2xl font-bold mt-6 mb-3">{getRichText(block.heading_2?.rich_text)}</h2>;
    
    case 'heading_3':
      return <h3 className="text-xl font-bold mt-4 mb-2">{getRichText(block.heading_3?.rich_text)}</h3>;
    
    case 'bulleted_list_item':
      return (
        <ul className="list-disc ml-6 mb-2">
          <li>{getRichText(block.bulleted_list_item?.rich_text)}</li>
        </ul>
      );
    
    case 'numbered_list_item':
      return (
        <ol className="list-decimal ml-6 mb-2">
          <li>{getRichText(block.numbered_list_item?.rich_text)}</li>
        </ol>
      );
    
    case 'code':
      const codeContent = getRichText(block.code?.rich_text);
      const language = block.code?.language;
      
      // Se for um bloco de código markdown, renderizar como markdown
      if (language === 'markdown') {
        return (
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline 
                    ? <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm" {...props} />
                    : <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm" {...props} />,
                pre: ({node, ...props}) => <pre className="my-4" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6 bg-gray-50 py-2" {...props} />
                ),
                hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
              }}
            >
              {codeContent}
            </ReactMarkdown>
          </div>
        );
      }
      
      // Bloco de código normal
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code className="text-sm">{codeContent}</code>
        </pre>
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6 bg-gray-50 py-2">
          {getRichText(block.quote?.rich_text)}
        </blockquote>
      );
    
    case 'callout':
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
          <p className="text-blue-900">{getRichText(block.callout?.rich_text)}</p>
        </div>
      );
    
    case 'divider':
      return <hr className="my-8 border-gray-300" />;

    case 'image': {
      const url = getFileOrExternalUrl(block.image);
      if (!url) return null;

      const caption = getRichText(block.image?.caption);

      const proxied = getProxiedImageUrl(url);
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={proxied || url}
              alt={caption || block.id || 'Imagem'}
              width={1200}
              height={675}
              className="h-auto w-full object-contain"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-gray-500">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'video': {
      const url = getFileOrExternalUrl(block.video);
      if (!url) return null;

      if (block.video?.type === 'file') {
        return (
          <div className="my-10">
            <video
              className="w-full rounded-xl bg-black"
              controls
              preload="metadata"
              src={url}
            />
          </div>
        );
      }

      const embedUrl = toEmbeddableUrl(url);
      return (
        <div className="my-10">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title="Vídeo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    case 'embed': {
      const url = block.embed?.url;
      if (!url) return null;

      const embedUrl = toEmbeddableUrl(url);
      return (
        <div className="my-10">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title="Embed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    case 'bookmark': {
      const url = block.bookmark?.url;
      if (!url) return null;

      if (looksLikeVideoUrl(url)) {
        const embedUrl = toEmbeddableUrl(url);
        return (
          <div className="my-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title="Vídeo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        );
      }

      return (
        <div className="my-8 rounded-xl border border-gray-200 p-4">
          <a className="text-blue-600 hover:text-blue-800 underline break-all" href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      );
    }

    case 'link_preview': {
      const url = block.link_preview?.url;
      if (!url) return null;

      if (looksLikeVideoUrl(url)) {
        const embedUrl = toEmbeddableUrl(url);
        return (
          <div className="my-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title="Vídeo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        );
      }

      return (
        <div className="my-8 rounded-xl border border-gray-200 p-4">
          <a className="text-blue-600 hover:text-blue-800 underline break-all" href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </div>
      );
    }

    case 'file': {
      const url = getFileOrExternalUrl(block.file);
      if (!url) return null;
      const name = block.file?.name || 'Arquivo';

      if (looksLikeVideoUrl(url)) {
        return (
          <div className="my-10">
            <video
              className="w-full rounded-xl bg-black"
              controls
              preload="metadata"
              src={url}
            />
          </div>
        );
      }

      return (
        <div className="my-8 rounded-xl border border-gray-200 p-4">
          <a className="text-blue-600 hover:text-blue-800 underline" href={url} target="_blank" rel="noreferrer">
            {name}
          </a>
        </div>
      );
    }
    
    default:
      console.log('Unhandled block type:', type);
      return null;
  }
}

function renderChildren(block: any) {
  const children = block?.children;
  if (!children || !Array.isArray(children) || children.length === 0) return null;

  return (
    <div className="ml-4 border-l border-gray-100 pl-4">
      {children.map((child: any, idx: number) => (
        <div key={child.id || idx}>{renderBlock(child)}{renderChildren(child)}</div>
      ))}
    </div>
  );
}

interface BlogPostPageProps {
  params: Promise<{ locale: 'pt-br' | 'en-us'; slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map(({ slug, locale }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} | Raphael Martins`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.cover ? [{ url: post.cover }] : [],
      type: 'article',
      publishedTime: post.publishedDate,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Fetch page content blocks
  const blocks = await getPageContent(post.id);

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    locale === 'pt-br' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Back Button */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {locale === 'pt-br' ? 'Voltar para o blog' : 'Back to blog'}
          </Link>
        </div>
      </div>

      {/* Cover Image — proxy evita timeout S3/Notion; priority melhora LCP */}
      {post.cover && (
        <div className="relative h-[400px] w-full min-h-[280px] bg-gray-100">
          <Image
            src={getProxiedImageUrl(post.cover) || post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      )}

      {/* Article Header */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-xl text-gray-600 mb-6">
            {post.summary}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <time dateTime={post.publishedDate}>{formattedDate}</time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>⏱️ {post.readingTime} {locale === 'pt-br' ? 'min de leitura' : 'min read'}</span>
              </>
            )}
          </div>

          <ShareButtons
            title={post.title}
            summary={post.summary}
            slug={post.slug}
            locale={locale}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://raphai.eu'}${locale === 'en-us' ? '/en-us' : '/pt-br'}/blog/${post.slug}`}
          />

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-900">
            {blocks.length === 0 ? (
              <p className="text-gray-500 italic">
                {locale === 'pt-br' 
                  ? 'Este post ainda não tem conteúdo. Adicione conteúdo no Notion!'
                  : 'This post has no content yet. Add content in Notion!'}
              </p>
            ) : (
              <article className="space-y-1">
                {blocks.map((block: any, index: number) => (
                  <div key={block.id || index}>
                    {renderBlock(block)}
                    {renderChildren(block)}
                  </div>
                ))}
              </article>
            )}
          </div>

          <BlogComments
            locale={locale}
            pageId={post.slug}
            pageUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://raphai.eu'}${locale === 'en-us' ? '/en-us' : '/pt-br'}/blog/${post.slug}`}
            pageTitle={post.title}
          />

          {/* Back to Blog CTA */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              {locale === 'pt-br' ? '← Ver todos os posts' : '← View all posts'}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
