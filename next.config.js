/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})


const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})

module.exports = nextConfig
