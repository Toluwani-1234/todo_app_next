import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes
  const protectedRoutes = ["/todos", "/profile"];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Define auth routes (login, register)
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some(route => pathname === route);
  
  // Get session token (ensure secret matches NextAuth config)
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  });
  
  console.log("Middleware Check:", {
    pathname,
    hasToken: !!token,
    isProtectedRoute,
    isAuthRoute
  });
  
  // Redirect logic
  if (isProtectedRoute && !token) {
    // Redirect to login if trying to access protected route without auth
    console.log("Redirecting to login - no token for protected route");
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  if (isAuthRoute && token) {
    // Redirect to HOME (not todos) if already authenticated
    console.log("Redirecting to home - already authenticated");
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  console.log("Allowing request to proceed");
  return NextResponse.next();
}

// Configure matcher for middleware
export const config = {
  matcher: [
    // Only match specific routes that need protection
    "/todos/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};