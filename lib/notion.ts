import { Client } from '@notionhq/client';
import type {
  QueryDatabaseResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  locale: 'pt-br' | 'en-us';
  tags: string[];
  cover?: string;
  readingTime?: number;
  featured: boolean;
}

// Helper: Extract properties from Notion page
function parsePageProperties(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  return {
    id: page.id,
    title: properties.Title?.type === 'title' 
      ? properties.Title.title[0]?.plain_text || '' 
      : '',
    slug: properties.Slug?.type === 'rich_text'
      ? properties.Slug.rich_text[0]?.plain_text || ''
      : '',
    summary: properties.Summary?.type === 'rich_text'
      ? properties.Summary.rich_text[0]?.plain_text || ''
      : '',
    publishedDate: properties['Published Date']?.type === 'date'
      ? properties['Published Date'].date?.start || ''
      : '',
    locale: properties.Locale?.type === 'select'
      ? (properties.Locale.select?.name as 'pt-br' | 'en-us') || 'pt-br'
      : 'pt-br',
    tags: properties.Tags?.type === 'multi_select'
      ? properties.Tags.multi_select.map(tag => tag.name)
      : [],
    cover: page.cover?.type === 'external'
      ? page.cover.external.url
      : page.cover?.type === 'file'
      ? page.cover.file.url
      : undefined,
    readingTime: properties['Reading Time']?.type === 'number'
      ? properties['Reading Time'].number || undefined
      : undefined,
    featured: properties.Featured?.type === 'checkbox'
      ? properties.Featured.checkbox
      : false,
  };
}

// Fetch published posts by locale
export async function getBlogPosts(locale: 'pt-br' | 'en-us'): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
          {
            property: 'Locale',
            select: {
              equals: locale,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
      ],
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(parsePageProperties);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getBlogPostBySlug(
  slug: string,
  locale: 'pt-br' | 'en-us'
): Promise<BlogPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Locale',
            select: {
              equals: locale,
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published',
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page = response.results[0] as PageObjectResponse;
    return parsePageProperties(page);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch page content (blocks) for react-notion-x
export async function getPageContent(pageId: string) {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    
    return blocks.results;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<Array<{ slug: string; locale: 'pt-br' | 'en-us' }>> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
    });

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(page => {
        const properties = page.properties;
        return {
          slug: properties.Slug?.type === 'rich_text'
            ? properties.Slug.rich_text[0]?.plain_text || ''
            : '',
          locale: properties.Locale?.type === 'select'
            ? (properties.Locale.select?.name as 'pt-br' | 'en-us') || 'pt-br'
            : 'pt-br',
        };
      })
      .filter(item => item.slug !== '');
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}
