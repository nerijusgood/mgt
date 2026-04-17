import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AppToaster } from "@/components/ui/toaster";

const headingFont = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"]
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Mother Goose Toys",
  description: "Toy rental subscription for growing families"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "";
  const isLandingPage = pathname === "/";

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        {isLandingPage ? null : <SiteHeader />}
        <main className={isLandingPage ? "min-h-screen max-w-none px-0 pb-0 pt-0" : undefined}>{children}</main>
        {isLandingPage ? null : <SiteFooter />}
        <AppToaster />
      </body>
    </html>
  );
}
