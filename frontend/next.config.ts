import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    middleware: {
      matcher: [
        '/dashboard/:path*',
        '/jobs/:path*',
        '/resume/:path*',
        '/career-plan/:path*',
        '/practice/:path*',
        '/profile/:path*'
      ]
    }
  }
};

export default nextConfig;
