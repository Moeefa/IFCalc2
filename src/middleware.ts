import { NextResponse } from "next/server";
import { auth as middleware } from "./auth";

export default middleware((request) => {
  if (request.nextUrl.pathname === "/api/auth/signin") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/auth/signin",
  ],
};
