/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
swcMinify: true,

images: {
domains: ['localhost', 'supabase.co'],
},

// Ensures Netlify + Next.js work correctly
output: 'standalone',
};

module.exports = nextConfig;
