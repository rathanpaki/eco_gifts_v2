import type { NextConfig } from "next";

const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
);
const apiOrigin = apiUrl.origin;
const apiProtocol = apiUrl.protocol === "https:" ? "https" : "http";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/images/**" }],
    remotePatterns: [
      {
        protocol: apiProtocol,
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/api/customizations/**",
        search: "",
      },
      {
        protocol: apiProtocol,
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/api/admin/orders/**",
        search: "",
      },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  async headers() {
    const developmentEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: `default-src 'self'; script-src 'self' 'unsafe-inline'${developmentEval}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: ${apiOrigin} https://*.googleusercontent.com https://firebasestorage.googleapis.com https://storage.googleapis.com; font-src 'self' data:; connect-src 'self' ${apiOrigin} https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://*.firebasestorage.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
