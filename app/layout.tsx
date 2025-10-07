//file: app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Under Maintenance - Diaspora AI",
  description: "Diaspora AI - Revolutionary AI-powered flight booking platform coming soon. We're building the future of travel through intelligent conversations.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    'Diaspora AI',
    'flight booking',
    'AI travel',
    'intelligent booking',
    'travel platform',
    'maintenance',
    'coming soon'
  ],
  authors: [{ name: 'Diaspora AI Team' }],
  creator: 'Diaspora AI',
  publisher: 'Diaspora AI',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Diaspora AI - Revolutionary Flight Booking',
    description: 'AI-powered flight booking platform coming soon. Experience the future of travel through intelligent conversations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diaspora AI - Revolutionary Flight Booking',
    description: 'AI-powered flight booking platform coming soon. Experience the future of travel through intelligent conversations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}