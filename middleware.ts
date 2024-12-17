import authConfig from "./auth.config";
import NextAuth from "next-auth";

import * as routes from "@/routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  if (
    req.auth &&
    Object.keys(req.auth).includes("message") &&
    !nextUrl.pathname.startsWith("/auth/error")
  )
    // if any server problems
    return Response.redirect(new URL("/auth/error", nextUrl.origin)); 
    // TODO: Make dedicated server error page

  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  const isPublicRoute = routes.publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = routes.authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(
        new URL(routes.DEFAULT_LOGIN_REDIRECT, nextUrl.origin),
      );
    return;
  }

  console.log(req.auth, " ", isLoggedIn, " ", isPublicRoute);

  if (!isLoggedIn && !isPublicRoute) {
    console.warn("Missing or invalid authentication. Redirecting to login...");
    return Response.redirect(new URL("/auth/login", nextUrl.origin));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
