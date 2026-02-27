import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/data";
import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/app/logout-button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user, profile } = await getCurrentUserProfile();
  if (!user) redirect("/auth/login");

  return (
    <div className="section-stack">
      <div className="surface flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Admin portal</p>
          <h2 className="mt-1 text-2xl">{profile?.full_name ?? "Admin"}</h2>
        </div>
        <LogoutButton />
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
