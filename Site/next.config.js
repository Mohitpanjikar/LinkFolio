/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com'], // Add the CDN domain here
    unoptimized: true // Required for static export
  },
  env: {
    // Backend API URL - will be replaced during deployment
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  // Enable static export for Netlify
  output: 'export',
  // Disable image optimization for static export
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
    unoptimized: true
  }
}

module.exports = nextConfig