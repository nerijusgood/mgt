import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/marketing/site-header";
import { AppToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Mother Goose Toys",
  description: "Toy rental subscription for growing families"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <AppToaster />
      </body>
    </html>
  );
}
