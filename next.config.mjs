/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
