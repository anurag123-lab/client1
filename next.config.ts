import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Image qualities we allow: 40 for the blurred backgrounds, 75 (default) for everything else.
    qualities: [40, 75],
  },
};

export default nextConfig;
