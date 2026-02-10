import { getBlogPosts } from '@/lib/notion';
import PostCard from '@/components/blog/PostCard';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// Revalidate every hour
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{ locale: 'pt-br' | 'en-us' }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  
  const titles = {
    'pt-br': 'Blog | Raphael Martins - Engenheiro Fullstack',
    'en-us': 'Blog | Raphael Martins - Fullstack Engineer',
  };

  const descriptions = {
    'pt-br': 'Artigos sobre desenvolvimento, produtos digitais e tecnologia.',
    'en-us': 'Articles about development, digital products, and technology.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const posts = await getBlogPosts(locale);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'pt-br' ? 'Blog' : 'Blog'}
            </h1>
            <p className="text-xl text-gray-300">
              {locale === 'pt-br'
                ? 'Artigos sobre desenvolvimento, produtos digitais e tecnologia.'
                : 'Articles about development, digital products, and technology.'}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {locale === 'pt-br'
                  ? '📝 Nenhum post publicado ainda. Volte em breve!'
                  : '📝 No posts published yet. Come back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
