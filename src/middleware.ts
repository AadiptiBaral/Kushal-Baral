import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/verify-otp",
    "/zxcvbn-admin/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Admin routes handling
  if (url.pathname.startsWith("/zxcvbn-admin")) {
    // If user has token and trying to access auth pages, redirect to dashboard
    if (
      token &&
      (url.pathname === "/zxcvbn-admin/signin" ||
        url.pathname === "/zxcvbn-admin/signup" ||
        url.pathname === "/zxcvbn-admin/verify-otp")
    ) {
      return NextResponse.redirect(
        new URL("/zxcvbn-admin/dashboard", request.url)
      );
    }

    // If user doesn't have token and trying to access dashboard, redirect to signin
    if (!token && url.pathname.startsWith("/zxcvbn-admin/dashboard")) {
      return NextResponse.redirect(
        new URL("/zxcvbn-admin/signin", request.url)
      );
    }
  }

  // Regular routes handling (existing logic)
  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or verify-otp
  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname === "/verify-otp")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to sign-in if user is not authenticated and trying to access dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
