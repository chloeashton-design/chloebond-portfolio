import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Project 2 moved from its numbered slug to a named one. Kept so any
      // link shared while the old URL was live still lands on the project.
      { source: '/work/project-02', destination: '/work/proton', permanent: true },
      { source: '/work/project-08', destination: '/work/hi-society', permanent: true },
    ];
  },
};

export default nextConfig;
