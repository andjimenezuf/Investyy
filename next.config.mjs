/** @type {import('next').NextConfig} */
const nextConfig = {
    // Existing configurations
    reactStrictMode: true,
    // Add any other configuration options here
  
    // New image configuration
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'logo.clearbit.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  