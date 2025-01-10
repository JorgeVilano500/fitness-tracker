import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
  images: {
    // apparently domains is depreciated, Ill fix when I get the chance
  }
};

export default nextConfig;


module.exports = {
  experimental: {
    appDir: true, 
  },
  output: 'standalone'
}