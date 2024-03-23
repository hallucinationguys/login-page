/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BaseBackEndURL: process.env.BaseURL,
  },
}

module.exports = nextConfig
