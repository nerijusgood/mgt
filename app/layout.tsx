import type { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AppToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Mother Goose Toys",
  description: "Sustainable toy boxes for families and childcare settings"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "";
  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
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
