/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]-[hash].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
