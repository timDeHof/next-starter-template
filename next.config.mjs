/** @type {import('next').NextConfig} */
import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env/server.ts");

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
