import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import ContactModal from "./components/ContactModal";
import { ModalProvider } from "./components/ModalContext";
import FloatingMessenger from "./components/FloatingMessenger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://lexcorp.uz'),
  title: {
    default: "LexCorp - Protecting Global Retail Giants",
    template: "%s | LexCorp",
  },
  description: "LexCorp specializes in Intellectual Property protection, brand security, and market analysis for global retail giants in Central Asia.",
  keywords: ["Intellectual Property", "Brand Protection", "Uzbekistan Law", "Retail Security", "LexCorp", "Legal Services", "Central Asia"],
  openGraph: {
    title: "LexCorp - Protecting Global Retail Giants",
    description: "Trusted by global brands to secure their intellectual property and market presence in Central Asia.",
    url: "https://lexcorp.uz",
    siteName: "LexCorp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LexCorp - Brand Protection & Intellectual Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexCorp - Protecting Global Retail Giants",
    description: "Trusted by global brands to secure their intellectual property and market presence.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'e450D2HMBmWwVHwPgX_3xqLtp-SV8ew2-tHN2UJenKs',
    yandex: 'fd5d87aade1af7fc',
  },
};

// Script to prevent flash of wrong theme on page load
const themeInitScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - runs before page renders to prevent flash */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LexCorp",
              "url": "https://lexcorp.uz",
              "logo": "https://lexcorp.uz/Logo%20dark.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+998 94 331 88 11",
                "email": "sanjar@aliboyev.com",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/lexcorp",
                "https://www.linkedin.com/company/lexcorp"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "LexCorp",
              "image": "https://lexcorp.uz/og-image.jpg",
              "description": "Intellectual Property protection and market analysis for global retail giants in Central Asia.",
              "url": "https://lexcorp.uz",
              "telephone": "+998943318811",
              "email": "sanjar@aliboyev.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "203rd Office, 107th house, Mustakillik street, Mirzo Ulugbek district",
                "addressLocality": "Tashkent",
                "postalCode": "100170",
                "addressCountry": "UZ"
              },
              "priceRange": "$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <ModalProvider>
              <Header />
              {children}
              <Footer />
              <FloatingMessenger />
            </ModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
