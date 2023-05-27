import "./env.mjs";
/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
    esmExternals: "loose",
  },
};

export default config;
