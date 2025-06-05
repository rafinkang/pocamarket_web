/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // docker에서 읽을 빌드 결과물을 Standalone로 output
};

export default nextConfig;
