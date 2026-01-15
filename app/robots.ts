import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // For Google, Bing, DuckDuckGo
        allow: '/',
        disallow: ['/studio', '/api', '/admin'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
    ],
    sitemap: 'https://lexcorp.uz/sitemap.xml',
  };
}
