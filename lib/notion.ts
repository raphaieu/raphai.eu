// Initialize environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const NOTION_REVALIDATE_SECONDS = 60 * 60; // 1h

// Helper function to call Notion API directly
async function notionFetch(endpoint: string, body?: any) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: NOTION_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Notion API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

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
function parsePageProperties(page: any): BlogPost {
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
      ? properties.Tags.multi_select.map((tag: any) => tag.name)
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
    const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
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
      .filter((page: any) => 'properties' in page)
      .map((page: any) => parsePageProperties(page));
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
    const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
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

    return parsePageProperties(response.results[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch page content (blocks) for react-notion-x
export async function getPageContent(pageId: string) {
  try {
    const response = await notionFetch(`/blocks/${pageId}/children?page_size=100`);
    return response.results;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<Array<{ slug: string; locale: 'pt-br' | 'en-us' }>> {
  try {
    const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
    });

    return response.results
      .filter((page: any) => 'properties' in page)
      .map((page: any) => {
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
      .filter((item: any) => item.slug !== '');
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}
