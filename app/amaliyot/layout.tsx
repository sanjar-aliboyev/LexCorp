import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amaliyot - Muvaffaqiyatli Ishlar',
  description: 'LexCorp amaliyoti - xalqaro kompaniyalar bilan ishlash tajribasi va muvaffaqiyatli huquqiy ishlar.',
  keywords: ['huquqiy amaliyot', 'muvaffaqiyatli ishlar', 'xalqaro tajriba', 'korporativ huquq'],
  openGraph: {
    title: 'Amaliyot | LexCorp',
    description: 'Xalqaro tajriba va muvaffaqiyatli huquqiy ishlar.',
    type: 'website',
  },
};

export default function AmaliyotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
