import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getPublicSupabaseEnv } from "@/lib/env";

const DEMO_COOKIE_NAME = "mg_demo_access";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const isSystemPath =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml");
  const isDemoGateBypass = pathname === "/demo-login" || pathname.startsWith("/api/demo-access");
  const demoPassword = process.env.DEMO_ACCESS_PASSWORD;

  if (!isSystemPath && !isDemoGateBypass && demoPassword) {
    const demoCookie = request.cookies.get(DEMO_COOKIE_NAME)?.value;
    if (demoCookie !== demoPassword) {
      const url = new URL("/demo-login", request.url);
      url.searchParams.set("next", `${pathname}${search}`);
      return NextResponse.redirect(url);
    }
  }

  const isAppRoute = pathname.startsWith("/app");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAppRoute && !isAdminRoute) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const env = getPublicSupabaseEnv();
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

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
  matcher: ["/((?!_next/static|_next/image).*)"]
};
