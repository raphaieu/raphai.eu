import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://raphai.eu';
  const currentDate = new Date();

  return [
    {
      url: `${baseUrl}/pt-br`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-br`,
          'en-US': `${baseUrl}/en-us`,
        },
      },
    },
    {
      url: `${baseUrl}/en-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-br`,
          'en-US': `${baseUrl}/en-us`,
        },
      },
    },
  ];
}
