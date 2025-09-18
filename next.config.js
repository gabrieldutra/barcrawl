/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações para produção
  output: "standalone",
  compress: true,
  poweredByHeader: false,

  // Configurações de imagem
  images: {
    domains: ["maps.googleapis.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
