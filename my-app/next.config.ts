/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },

  images: {
    domains: ["huxaeppwmquuhpeibzye.supabase.co"],
  },
};

export default nextConfig;
