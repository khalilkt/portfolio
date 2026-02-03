import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  turbopack: {},
  outputFileTracingIncludes: {
    "server.js": ["./node_modules/libsql/**"],
  },
  // experimental: {
  //   turbopack: {
  //     enabled: false,
  //   },
  // },
};

export default withPayload(nextConfig);
