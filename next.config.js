/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.shopify.com',
      'images.ctfassets.net',
      'downloads.ctfassets.net',
      'demo.nacelle-magento.com',
      'images.salsify.com',
      '3da1c38415.nxcli.io'
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
