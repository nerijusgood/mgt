import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function SiteHeader() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          Mother Goose Toys
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/how-it-works" className="px-2 text-sm">
            How It Works
          </Link>
          <Link href="/pricing" className="px-2 text-sm">
            Pricing
          </Link>
          <Link href="/toys" className="px-2 text-sm">
            Toys
          </Link>
          {user ? (
            <Link href="/app/dashboard" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
              Dashboard
            </Link>
          ) : (
            <Link href="/auth/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
