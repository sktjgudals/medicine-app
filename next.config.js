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
      "www.youtube.com",
    ],
  },
};

module.exports = nextConfig;
