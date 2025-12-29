// Sanity CMS Types

export interface LocalizedContent {
  UZ?: string;
  RU?: string;
  EN?: string;
}

export interface SuccessCase {
  id: string;
  image: string;
  category: string;
  statValue: string;
  content: {
    UZ?: { title: string; description: string };
    RU?: { title: string; description: string };
    EN?: { title: string; description: string };
  };
}

export interface ProcessedCase {
  id: string;
  image: string;
  category: string;
  title: string;
  challenge: string;
  outcome: string;
  stat: string;
}

export interface BlogPost {
  id: string;
  image: string;
  date: string;
  content: {
    UZ?: BlogPostContent;
    RU?: BlogPostContent;
    EN?: BlogPostContent;
  };
}

export interface BlogPostContent {
  category: string;
  title: string;
  excerpt: string;
}

export interface ProcessedBlogPost {
  id: string;
  image: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
}

export interface Video {
  title: string;
  url: string;
}

export interface ClientData {
  id: number;
  name: string;
  industry: string;
  country: string;
  logo: string;
  description?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  email: string;
  linkedin: string;
  facebook: string;
  role: LocalizedContent;
  specialization: LocalizedContent;
  education: LocalizedContent;
  experience: string;
}

export type Language = 'UZ' | 'RU' | 'EN';

export interface CategoryMap {
  UZ: Record<string, string>;
  RU: Record<string, string>;
  EN: Record<string, string>;
}
