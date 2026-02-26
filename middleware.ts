import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getPublicSupabaseEnv } from "@/lib/env";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const env = getPublicSupabaseEnv();

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAppRoute = pathname.startsWith("/app");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!user && (isAppRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user && (isAppRoute || isAdminRoute)) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

    const role = profile?.role;

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }

    if (isAppRoute && role !== "parent") {
      return NextResponse.redirect(new URL("/admin/inventory", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"]
};
