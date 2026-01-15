import { notFound } from 'next/navigation';
import { client } from '../../sanity/client'; // Use your existing client
import BlogPostClient from './BlogPostClient';
import type { Metadata } from 'next';

// Fetch helper (defined here to avoid import errors)
async function getPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      date,
      "image": image.asset->url,
      author->{name},
      content // Fetches { UZ: {...}, RU: {...}, EN: {...} }
    }
  `, { slug });
}

// 1. Dynamic Metadata (SEO)
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params; // Await params for Next.js 15+
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Default to EN for SEO tags (better for international reach), fallback to others
  const primaryContent = post.content?.EN || post.content?.UZ || post.content?.RU;
  const title = primaryContent?.title || 'LexCorp Blog';
  const description = primaryContent?.excerpt || 'Legal insights and intellectual property news from LexCorp.';
  const imageUrl = post.image || '/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author?.name ? [post.author.name] : ['LexCorp'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// 2. Main Page Component
export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params; // Await params here too
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // Pass data to the Client Component for rendering
  return (
    <BlogPostClient post={post} />
  );
}