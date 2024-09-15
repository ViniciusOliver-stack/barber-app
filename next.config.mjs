import withPWAInit from "@ducanh2912/next-pwa"
/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
})

export default withPWA({
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "icons.veryicon",
      },
    ],
  },
})
