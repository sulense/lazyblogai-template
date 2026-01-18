/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.in',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/:filename(google.*\\.html)',
                destination: '/api/verification/:filename',
            },
            {
                source: '/images/:path*',
                destination: 'https://fmsylpaaluexiqxgpfrv.supabase.co/storage/v1/object/public/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
