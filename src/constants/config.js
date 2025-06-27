// src/constants/config.js

// S3 이미지 관련 상수
const S3_IMAGE_CONFIG = {
  PROTOCOL: 'https',
  HOSTNAME: 'pocamarket-burket.s3.ap-northeast-2.amazonaws.com',
  IMAGES_PATH: '/images',
};

// 상수를 조합하여 기본 이미지 URL 생성
const S3_IMAGES_BASE_URL = `${S3_IMAGE_CONFIG.PROTOCOL}://${S3_IMAGE_CONFIG.HOSTNAME}${S3_IMAGE_CONFIG.IMAGES_PATH}`;

// export 대신 module.exports를 사용합니다.
module.exports = {
  S3_IMAGE_CONFIG,
  S3_IMAGES_BASE_URL,
};