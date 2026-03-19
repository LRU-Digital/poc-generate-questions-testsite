import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // pdf-parse relies on Node.js built-ins (fs, path); keep it server-only
  serverExternalPackages: ["pdf-parse"],
  // Silence the workspace-root warning caused by the parent package-lock.json
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
