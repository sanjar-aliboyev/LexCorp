import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jamoa - Bizning Mutaxassislar',
  description: 'ProLex jamoasi - tajribali advokatlar va yuristlar. Korporativ huquq, fuqarolik ishlari va soliq bo\'yicha mutaxassislar.',
  keywords: ['advokat', 'yurist', 'huquqshunos', 'jamoa', 'ProLex'],
  openGraph: {
    title: 'Jamoa | ProLex',
    description: 'Tajribali advokatlar va yuristlar jamoasi bilan tanishing.',
    type: 'website',
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
