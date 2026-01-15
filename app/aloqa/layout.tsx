import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aloqa - Biz bilan bog\'laning',
  description: 'LexCorp bilan bog\'laning. Toshkent shahridagi ofisimiz manzili, telefon raqami va elektron pochta.',
  keywords: ['aloqa', 'bog\'lanish', 'advokat Toshkent', 'yuridik maslahat'],
  openGraph: {
    title: 'Aloqa | LexCorp',
    description: 'Bepul konsultatsiya olish uchun biz bilan bog\'laning.',
    type: 'website',
  },
};

export default function AloqaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
