/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "yakjungs.s3.ap-northeast-2.amazonaws.com",
      "yakjung.site",
      "yakjung.s3.ap-northeast-2.amazonaws.com",
      "www.youtube.com",
      "i1.ytimg.com",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
