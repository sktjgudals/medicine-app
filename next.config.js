/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
    // prependData:
    //   "@import 'public/styles/colors.scss'; @import 'public/styles/mixin.scss';",
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["yakjung.s3.ap-northeast-2.amazonaws.com", "yakjung.site"],
  },
};

module.exports = nextConfig;
