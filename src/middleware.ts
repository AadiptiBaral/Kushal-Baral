import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/zxcvbn-auth/:path*",
    "/zxcvbn-admin/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Admin routes handling
  if (url.pathname.startsWith("/zxcvbn-admin")) {
    // If user has token and trying to access auth pages, redirect to admin dashboard
    if (
      token &&
      (url.pathname === "/zxcvbn-admin/signin" ||
        url.pathname === "/zxcvbn-admin/signup" ||
        url.pathname === "/zxcvbn-admin/verify-otp")
    ) {
      return NextResponse.redirect(
        new URL("/zxcvbn-admin", request.url)
      );
    }

    // Protected admin routes - require authentication
    const protectedAdminRoutes = [
      "/zxcvbn-admin",
      "/zxcvbn-admin/dashboard",
      "/zxcvbn-admin/settings", 
      "/zxcvbn-admin/users",
      "/zxcvbn-admin/"
    ];

    // Check if current path is a protected route or starts with admin
    const isProtectedRoute = protectedAdminRoutes.some(route => 
      url.pathname === route || url.pathname.startsWith("/zxcvbn-admin/")
    );

    // Exclude auth routes from protection
    const isAuthRoute = 
      url.pathname === "/zxcvbn-admin/signin" ||
      url.pathname === "/zxcvbn-admin/signup" ||
      url.pathname === "/zxcvbn-admin/verify-otp";

    // If user doesn't have token and trying to access protected routes, redirect to signin
    if (!token && isProtectedRoute && !isAuthRoute) {
      return NextResponse.redirect(
        new URL("/zxcvbn-auth/signin", request.url)
      );
    }
  }

  // Auth routes handling
  if (url.pathname.startsWith("/zxcvbn-auth")) {
    // If user has token and trying to access auth pages, redirect to admin
    if (
      token &&
      (url.pathname === "/zxcvbn-auth/signin" ||
        url.pathname === "/zxcvbn-auth/signup" ||
        url.pathname === "/zxcvbn-auth/verify-otp")
    ) {
      return NextResponse.redirect(
        new URL("/zxcvbn-admin", request.url)
      );
    }
  }

  return NextResponse.next();
}