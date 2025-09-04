import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard", "/jobs" , '/resume' , '/career-plan' , '/practice/topics' , '/profile'];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("message", "login-required");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
