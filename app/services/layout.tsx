import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xizmatlar - Huquqiy Xizmatlar',
  description: 'ProLex yuridik xizmatlari: korporativ huquq, fuqarolik ishlari, soliq maslahat, sud vakolatxonasi va boshqalar.',
  keywords: ['huquqiy xizmatlar', 'advokat', 'yurist', 'korporativ huquq', 'Toshkent'],
  openGraph: {
    title: 'Xizmatlar | ProLex',
    description: 'Professional yuridik xizmatlar - korporativ huquq, sud vakolatxonasi, soliq maslahat.',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
