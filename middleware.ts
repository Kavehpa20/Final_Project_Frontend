import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:Alpha_coffee=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  let token = request.cookies.get("Alpha_coffee")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/admin_panel/:path*"],
};
