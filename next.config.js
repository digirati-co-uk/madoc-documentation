const withNextra = require('nextra')({
  experimental: {
    turboMode: true,
  },
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: false,
});

module.exports = withNextra();
