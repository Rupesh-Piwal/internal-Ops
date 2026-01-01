import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


// export default clerkMiddleware({
//   publicRoutes: ["/sign-in", "/sign-up", "/"],
// });


const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
