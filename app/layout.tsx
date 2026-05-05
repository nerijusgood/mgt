import type { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AppToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mothergoosetoys.dk"),
  title: {
    default: "Mother Goose Toys",
    template: "%s — Mother Goose Toys"
  },
  description: "Sustainable toy boxes for families and childcare settings",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png" }]
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "";
  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Circular-Std-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Circular-Std-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {isLandingPage ? null : <SiteHeader />}
        <main className={isLandingPage ? "min-h-screen max-w-none px-0 pb-0 pt-0" : undefined}>
          {children}
        </main>
        {isLandingPage ? null : <SiteFooter />}
        <AppToaster />
      </body>
    </html>
  );
}
