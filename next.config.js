const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
      },
    env: {
        SITE_TITLE: 'Supacharger Starter',
    },
};

module.exports = withNextIntl(nextConfig);
