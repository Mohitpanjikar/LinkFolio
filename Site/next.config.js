/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com'], // Add the CDN domain here
  },
  env: {
    // Backend API URL - will be replaced during deployment
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  }
}

module.exports = nextConfig