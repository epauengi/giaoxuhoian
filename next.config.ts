import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async rewrites() {
    const source = "/:path((?!admin(?:/|$)|api(?:/|$)|_next(?:/|$)|vi(?:/|$)|en(?:/|$)).*)";
    return {
      afterFiles: [
        { source, has: [{ type: "cookie", key: "site-locale", value: "en" }], destination: "/en/:path" },
        { source, destination: "/vi/:path" },
      ],
    };
  },
};

export default nextConfig;
