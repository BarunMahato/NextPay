import 'dotenv/config'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@node-rs/argon2"],
  reactCompiler: true,
  
};

export default nextConfig;
