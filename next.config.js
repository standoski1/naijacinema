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
    domains: ['localhost','naijacinemas.herokuapp.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  target: "serverless",
})

module.exports = nextConfig
