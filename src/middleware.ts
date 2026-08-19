import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/admin/login";

  // 1. Jika pengguna sudah login sebagai ADMIN dan mencoba akses halaman login -> redirect ke /admin
  if (isLoginPage && isLoggedIn && userRole === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  // 2. Jika pengguna belum login dan mencoba akses rute admin -> redirect ke /login
  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Jika pengguna terotentikasi tapi bukan ADMIN -> redirect ke homepage /
  if (isAdminRoute && !isLoginPage && isLoggedIn && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/admin/login"],
};

