// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";
import ApiClient from "./api";

const apiClient = new ApiClient();

export async function middleware(req: NextRequest) {
  // Parse cookies from the request headers
  const cookies = Cookies.get();
  const token = cookies.accessToken;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  console.log("Path: ", path);

  // Check if the token exists
  if (path.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Verify the token
    const response = await apiClient.auth.helper.verifyToken(token);

    if (response.status === false) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (path.startsWith("/")) {
    const response = await apiClient.auth.helper.verifyToken(token);

    if (response.status === true) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};
