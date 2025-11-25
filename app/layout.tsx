//file: app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Join the Waitlist - Diaspora AI",
  description: "Join the Diaspora AI waitlist! Be the first to experience our revolutionary AI-powered flight booking platform. Early access available soon.",
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
    'waitlist',
    'early access',
    'coming soon'
  ],
  authors: [{ name: 'Diaspora AI Team' }],
  creator: 'Diaspora AI',
  publisher: 'Diaspora AI',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Join the Diaspora AI Waitlist - Revolutionary Flight Booking',
    description: 'Join our exclusive waitlist for early access to the AI-powered flight booking platform. Experience the future of travel through intelligent conversations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Diaspora AI Waitlist - Revolutionary Flight Booking',
    description: 'Join our exclusive waitlist for early access to the AI-powered flight booking platform. Experience the future of travel.',
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