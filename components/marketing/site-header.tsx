import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export async function SiteHeader() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border/90 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[72rem] items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Mother Goose Toys
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1 md:gap-2">
          <Link href="/how-it-works" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-soft ease-soft hover:text-foreground">
            How It Works
          </Link>
          <Link href="/pricing" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-soft ease-soft hover:text-foreground">
            Pricing
          </Link>
          <Link href="/toys" className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-soft ease-soft hover:text-foreground">
            Toys
          </Link>
          {user ? (
            <Link href="/app/dashboard" className="ml-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition duration-soft ease-soft hover:brightness-95">
              Dashboard
            </Link>
          ) : (
            <Link href="/auth/login" className="ml-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition duration-soft ease-soft hover:brightness-95">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
