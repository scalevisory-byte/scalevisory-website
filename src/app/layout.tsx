import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content/site";
import Analytics from "@/components/Analytics";
import TawkChat from "@/components/TawkChat";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Accounting, Tax & Advisory, Surat`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Scale Visory — Resources" href="/rss.xml" />
      </head>
      <body>
        {children}
        <WhatsAppFab />
        <Analytics />
        <TawkChat />
      </body>
    </html>
  );
}
