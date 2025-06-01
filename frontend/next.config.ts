import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@phosphor-icons/react'],
  },
};

export default nextConfig;
