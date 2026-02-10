'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { BlogPost } from '@/lib/notion';
import { useTranslations } from 'next-intl';

interface PostCardProps {
  post: BlogPost;
  locale: 'pt-br' | 'en-us';
}

export default function PostCard({ post, locale }: PostCardProps) {
  const t = useTranslations('blog');

  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    locale === 'pt-br' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link
      href={`/blog/${post.slug}` as any}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      {post.cover && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.featured && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
              ⭐ {t('featured')}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.summary}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formattedDate}</span>
          {post.readingTime && (
            <span>⏱️ {post.readingTime} min</span>
          )}
        </div>
      </div>
    </Link>
  );
}
