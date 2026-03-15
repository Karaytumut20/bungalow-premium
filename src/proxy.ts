import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Sadece /admin ve altındaki sayfaları koru
export const config = {
  matcher: ["/admin/:path*"],
};
