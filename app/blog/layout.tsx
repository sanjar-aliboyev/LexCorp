import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Huquqiy Yangiliklar',
  description: 'Huquqiy yangiliklar, maqolalar va tahlillar. O\'zbekiston qonunchiligidagi o\'zgarishlar haqida bilib oling.',
  keywords: ['huquqiy blog', 'qonunchilik', 'yangiliklar', 'maqolalar', 'O\'zbekiston huquqi'],
  openGraph: {
    title: 'Blog | ProLex',
    description: 'Huquqiy yangiliklar va professional maqolalar.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
