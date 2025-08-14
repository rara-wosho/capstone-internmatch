/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pinimg.com", // Replace with the actual hostname of your image source
            },
            // Add more patterns for other external image sources if needed
        ],
    },
};

export default nextConfig;
