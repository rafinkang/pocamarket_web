/** @type {import('next').NextConfig} */

// 1. 위에서 생성한 상수 파일 가져오기
import { S3_IMAGE_CONFIG } from './src/constants/config.js';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // docker에서 읽을 빌드 결과물을 Standalone로 output
  // sassOptions: {
  //   includePaths: [path.join(process.cwd(), 'src', 'styles')], // @import 시 기본 경로로 추가
  //   prependData: `@import "variables.scss";`, // 모든 SCSS 파일에 자동으로 특정 파일 import (예: 변수 파일)
  // },
  compiler: {
    removeConsole: isProduction ? { except: ['error'] } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: S3_IMAGE_CONFIG.PROTOCOL,
        hostname: S3_IMAGE_CONFIG.HOSTNAME,
        port: '',
        pathname: `${S3_IMAGE_CONFIG.IMAGES_PATH}/**`, // 상수와 와일드카드를 조합
      },
    ],
  },
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
// module.exports = nextConfig; 
