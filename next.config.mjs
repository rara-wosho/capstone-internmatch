/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pinimg.com",
            },
            {
                protocol: "https",
                hostname: "idxksgsjllytgrbkmdys.supabase.co",
            },
            // Add more patterns for other external image sources if needed
        ],
    },
};

export default nextConfig;
