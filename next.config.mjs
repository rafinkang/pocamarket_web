/** @type {import('next').NextConfig} */

// 1. 위에서 생성한 상수 파일 가져오기
import { S3_IMAGE_CONFIG } from './src/constants/config.js';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  
  // 프로덕션에서만 standalone 설정 (개발환경에서는 HMR 방해)
  ...(isProduction && { output: 'standalone' }),
  
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
  
  // Docker 환경에서 HMR 최적화
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
// module.exports = nextConfig; 
