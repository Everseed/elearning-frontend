/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/fonts/',
              outputPath: 'static/fonts/',
              name: '[name].[ext]',
            },
          },
        });
        return config;
      },
};
/* const path = require('path'); */

export default nextConfig;
