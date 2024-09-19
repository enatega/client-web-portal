/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      'plus.unsplash.com',
      'res.cloudinary.com',
      'images.unsplash.com',
    ], // Add placehold.co as an allowed domain
  },
};

export default nextConfig;
