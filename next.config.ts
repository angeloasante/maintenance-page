// next.config.js - Remove static export
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' completely!
  images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig