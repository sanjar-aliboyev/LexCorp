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
  title: {
    template: '%s | LexCorp',
    default: 'LexCorp - Professional Legal Services in Uzbekistan',
  },
  description: 'Expert legal consultation for corporate, civil, and economic law.',
  metadataBase: new URL('https://lexcorp.uz'),
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
                "telephone": "+998 71 200 00 00",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/lexcorp",
                "https://www.linkedin.com/company/lexcorp"
              ]
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
