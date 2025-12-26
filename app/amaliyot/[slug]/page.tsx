import { notFound } from 'next/navigation';
import { client } from '../../sanity/client';
import CaseStudyClient from './CaseStudyClient';
import type { Metadata } from 'next';

// 1. Fetch Helper
async function getCase(slug: string) {
  return client.fetch(`
    *[_type == "successCase" && slug.current == $slug][0] {
      "id": slug.current,
      "image": image.asset->url,
      category,
      statValue,
      content // Fetches { UZ: {...}, RU: {...}, EN: {...} }
    }
  `, { slug });
}

// 2. SEO Metadata
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const data = await getCase(params.slug);

  if (!data) return {};

  // Default to UZ for SEO tags
  const primaryContent = data.content?.UZ || data.content?.EN || data.content?.RU;

  return {
    title: `${primaryContent?.title || 'Success Case'} | ProLex`,
    description: primaryContent?.description || 'Legal success story.',
    openGraph: {
      images: data.image ? [data.image] : [],
    }
  };
}

// 3. Main Page
export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = await getCase(params.slug);

  if (!data) {
    notFound();
  }

  return <CaseStudyClient data={data} />;
}