import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import ContactModal from "./components/ContactModal";
import { ModalProvider } from "./components/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | ProLex',
    default: 'ProLex - Professional Legal Services in Uzbekistan',
  },
  description: 'Expert legal consultation for corporate, civil, and economic law.',
  metadataBase: new URL('https://prolex.uz'), // Replace with your actual domain later
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ProLex",
              "url": "https://prolex.uz",
              "logo": "https://prolex.uz/Logo%20dark.png", // Assuming this is the path to your logo
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+998 71 200 00 00", // Replace with actual phone number
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/prolex", // Replace with actual social media links
                "https://www.linkedin.com/company/prolex"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ModalProvider>
            <Header />
            {children}
            <Footer />
          </ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}