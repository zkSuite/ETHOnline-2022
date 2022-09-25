/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    NEXT_PUBLIC_WEB3_STORAGE: process.env.NEXT_PUBLIC_WEB3_STORAGE,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_ALCEHMY_ID: process.env.NEXT_PUBLIC_ALCEHMY_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
