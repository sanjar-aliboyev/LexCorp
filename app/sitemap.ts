import { MetadataRoute } from 'next';
import { getAllPostSlugs } from './lib/sanity'; // Adjust path as needed

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lexcorp.uz'; // Replace with your actual domain

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/aloqa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/amaliyot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Add other static pages here
  ];

  // Dynamic blog posts
  const slugs = await getAllPostSlugs();
  const blogPostPages: MetadataRoute.Sitemap = slugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(), // Consider fetching actual post last modified date from Sanity
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPostPages];
}
