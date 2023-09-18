const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin'); // line to add

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  },
  images: {
    domains: ['nrs.harvard.edu'],
  },
};

module.exports = nextConfig;
