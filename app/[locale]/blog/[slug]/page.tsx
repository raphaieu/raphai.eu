import { getBlogPostBySlug, getAllPostSlugs, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NotionAPI } from 'notion-client';
import NotionRenderer from '@/components/blog/NotionRenderer';

// Revalidate every hour
export const revalidate = 3600;

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
  unstable_setRequestLocale(locale);

  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Fetch Notion page content using notion-client (for react-notion-x)
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(post.id);

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    locale === 'pt-br' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <main className="min-h-screen bg-white">
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

      {/* Cover Image */}
      {post.cover && (
        <div className="relative h-[400px] w-full bg-gray-100">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
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
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-12 pb-8 border-b border-gray-200">
            <time dateTime={post.publishedDate}>{formattedDate}</time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>⏱️ {post.readingTime} {locale === 'pt-br' ? 'min de leitura' : 'min read'}</span>
              </>
            )}
          </div>

          {/* Notion Content */}
          <div className="prose prose-lg max-w-none">
            <NotionRenderer recordMap={recordMap} />
          </div>

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
