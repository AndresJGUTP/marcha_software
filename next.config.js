/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config) => {
      config.module.rules.push({
        test: /\.node/,
        use: 'raw-loader',
      });
    
      return config;
    },
}

module.exports = nextConfig
