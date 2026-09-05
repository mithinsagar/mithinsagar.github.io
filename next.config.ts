import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the whole site prerenders to HTML for GitHub Pages.
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  images: {
    // Pages has no image optimiser, so sources are pre-sized at build time.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
