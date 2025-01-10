import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: 'standalone',
  /* config options here */
  images: {
    // apparently domains is depreciated, Ill fix when I get the chance
  }
};

export default nextConfig;

