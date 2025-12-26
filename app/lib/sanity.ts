import { client } from '../sanity/client';

export async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    "slug": slug.current,
    "image": image.asset->url,
    date,
    author,
    content {
      UZ {
        category,
        title,
        excerpt,
        body
      },
      RU {
        category,
        title,
        excerpt,
        body
      },
      EN {
        category,
        title,
        excerpt,
        body
      }
    }
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

export async function getAllPostSlugs() {
  const query = `*[_type == "post"].slug.current`;
  const slugs = await client.fetch(query);
  return slugs;
}
