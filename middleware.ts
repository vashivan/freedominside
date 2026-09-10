import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

function detectLocale(req: NextRequest): string {
  const acceptLanguage = req.headers.get("accept-language") || "";
  // Ukrainian stays the default for everyone except browsers that clearly
  // prefer English ahead of Ukrainian/Russian.
  const prefersEnglish = /\ben\b/i.test(acceptLanguage) && !/\b(uk|ru)\b/i.test(acceptLanguage.split(",")[0]);
  return prefersEnglish ? "en" : defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, static assets and Next.js internals.
  matcher: ["/((?!api|_next|assets|favicon.ico).*)"],
};
