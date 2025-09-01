import "./src/env";

import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{hostname: "ik.imagekit.io"}],
  },
};

export default nextConfig;
