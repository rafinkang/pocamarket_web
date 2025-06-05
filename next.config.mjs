/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // docker에서 읽을 빌드 결과물을 Standalone로 output
  // sassOptions: {
  //   includePaths: [path.join(process.cwd(), 'src', 'styles')], // @import 시 기본 경로로 추가
  //   prependData: `@import "variables.scss";`, // 모든 SCSS 파일에 자동으로 특정 파일 import (예: 변수 파일)
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pocamarket.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
