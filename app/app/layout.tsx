import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/data";
import { AppNav } from "@/components/app/app-nav";
import { LogoutButton } from "@/components/app/logout-button";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getCurrentUserProfile();
  if (!user) redirect("/auth/login");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Parent portal</p>
          <h1 className="text-2xl font-semibold">{profile?.full_name ?? "Parent"}</h1>
        </div>
        <LogoutButton />
      </div>
      <AppNav />
      {children}
    </div>
  );
}
