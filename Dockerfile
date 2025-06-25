# 심플한 Next.js 프로덕션 Dockerfile
FROM node:22-alpine
WORKDIR /src

# 패키지 파일들 복사
COPY package*.json ./
COPY prisma ./prisma/

# 의존성 설치
RUN npm install

# 프로젝트 파일들 복사
COPY . .

# 프로덕션 빌드
RUN npm run build

# 환경 설정
ENV NODE_ENV=production

EXPOSE 3000

# 프로덕션 서버 실행
CMD ["npm", "start"]