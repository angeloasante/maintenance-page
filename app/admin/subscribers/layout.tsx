//file: app/admin/subscribers/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Travis Develops",
  description: "Administrative dashboard for managing subscribers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}