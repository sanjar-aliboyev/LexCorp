import { Inter } from 'next/font/google';
import './globals.css'; // Assuming a global CSS file
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | ProLex',
    default: 'ProLex - Professional Legal Services in Uzbekistan',
  },
  description: 'Expert legal consultation for corporate, civil, and economic law.',
  metadataBase: new URL('https://prolex.uz'), // Replace with your actual domain later
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* JSON-LD Schema for Organization/LegalService */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService', // Or 'Organization'
              'name': 'ProLex',
              'url': 'https://prolex.uz', // Replace with your actual domain
              'logo': 'https://prolex.uz/logo.png', // Replace with your actual logo URL
              'description': 'Expert legal consultation for corporate, civil, and economic law in Uzbekistan.',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Your Street Address', // Replace
                'addressLocality': 'Your City', // Replace
                'addressRegion': 'Your Region', // Replace
                'postalCode': 'Your Postal Code', // Replace
                'addressCountry': 'UZ',
              },
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+998-XX-XXX-XX-XX', // Replace
                'contactType': 'customer service',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
