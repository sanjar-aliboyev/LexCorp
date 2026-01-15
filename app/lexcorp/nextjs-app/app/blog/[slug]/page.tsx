// Placeholder for fetching post data from Sanity
async function getPost(slug: string) {
  // In a real application, you would fetch data from Sanity here.
  // For now, returning dummy data.
  return {
    title: `Dynamic Post: ${slug.replace(/-/g, ' ')}`,
    excerpt: `This is an excerpt for the dynamic post about ${slug.replace(/-/g, ' ')}.`,
    image: `https://via.placeholder.com/1200x630?text=${slug}`,
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image], // Shows image when shared on Telegram/LinkedIn
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <img src={post.image} alt={post.title} width={600} height={315} />
      <p>This is the content of the blog post for {params.slug}.</p>
    </main>
  );
}
