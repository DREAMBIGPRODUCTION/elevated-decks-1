/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/materials",
        destination: "/services#materials",
        permanent: true,
      },
      {
        source: "/gallery/clifton-park-azek-harvest-collection",
        destination: "/gallery/azek-pool-deck-clifton-park-ny",
        permanent: true,
      },
      {
        source: "/gallery/jie-elevated-trex-deck-guilderland-ny",
        destination: "/gallery/guilderland-trex-select-deck",
        permanent: true,
      },
      {
        source: "/gallery/rainbow-stair-deck-colonie-ny",
        destination: "/gallery/multi-level-stair-deck-colonie-ny",
        permanent: true,
      },
      {
        source: "/gallery/brandon-pressure-treated-deck-troy-ny",
        destination: "/gallery/pressure-treated-deck-troy-ny",
        permanent: true,
      },
      {
        source: "/gallery/jamie-trex-deck-delmar-ny",
        destination: "/gallery/trex-select-saratoga-ny",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
