/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {
      // Ensure Turbopack treats this directory as the workspace root
      root: process.cwd(),
    },
  },
}

export default nextConfig
