const withNextra = require('nextra')({
  experimental: {
    turboMode: true,
  },
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra();
