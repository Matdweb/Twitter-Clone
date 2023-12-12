/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/id/**'
            },
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                port: '',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
