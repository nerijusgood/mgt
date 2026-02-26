import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/data";
import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/app/logout-button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getCurrentUserProfile();
  if (!user) redirect("/auth/login");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Admin portal</p>
          <h1 className="text-2xl font-semibold">{profile?.full_name ?? "Admin"}</h1>
        </div>
        <LogoutButton />
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
