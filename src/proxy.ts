import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/account", "/admin", "/orders", "/wishlist", "/checkout"];
const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? "session";

export function proxy(request: NextRequest) {
  if (!protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) return NextResponse.next();
  if (request.cookies.has(sessionCookieName)) return NextResponse.next();
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = { matcher: ["/account/:path*", "/admin/:path*", "/orders/:path*", "/wishlist/:path*", "/checkout/:path*"] };
