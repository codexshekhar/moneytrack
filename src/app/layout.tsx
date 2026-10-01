import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/Providers';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneyTrack — Know Your Money. Reach Your Goals.",
  description: "Track money you've lent, money you've borrowed, repayments, and savings goals in one simple personal money management app.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MoneyTrack",
  },
  openGraph: {
    title: "MoneyTrack — Know Your Money. Reach Your Goals.",
    description: "Track money you've lent, money you've borrowed, repayments, and savings goals in one simple personal money management app.",
    type: "website",
    locale: "en_US",
    siteName: "MoneyTrack",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyTrack — Know Your Money. Reach Your Goals.",
    description: "Track money you've lent, money you've borrowed, repayments, and savings goals in one simple personal money management app.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <Script
          id="sw-register"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('SW registered:', registration.scope);
                    })
                    .catch(error => {
                      console.log('SW registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}