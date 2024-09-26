/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'enatega.com',
      },
      {
        protocol: 'https',
        hostname: 'www.lifcobooks.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ], // Add placehold.co as an allowed domain
  },
};

export default nextConfig;
