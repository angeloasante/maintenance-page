import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Under Maintenance - Travis Develops",
  description: "We are currently facing some issues with our system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add any additional head elements here */}
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
