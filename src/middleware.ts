import createMiddleware from "next-intl/middleware";
import { routing } from "./config/routing";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAdminRoute =
    pathname.includes("/admin") && !pathname.includes("/admin/login");

  if (isAdminRoute && !req.auth) {
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.url));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
