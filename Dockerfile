# ARG 주입
ARG NODE_ENV
ARG NEXT_PUBLIC_DEBUG
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_LOCAL_API_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_CLIENT_SECRET

# 빌드 단계
FROM node:22-alpine AS builder
WORKDIR /src

# 패키지 파일들 복사
COPY package*.json ./
COPY prisma ./prisma/

# 의존성 설치
RUN npm install

# 프로젝트 파일들 복사
COPY . .

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_DEBUG=${NEXT_PUBLIC_DEBUG}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_LOCAL_API_URL=${NEXT_PUBLIC_LOCAL_API_URL}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=${NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}

# 프로덕션 빌드
RUN npm run build

# 실행 단계
FROM node:22-alpine AS runner
WORKDIR /src

# 1. standalone 서버 파일 복사
COPY --from=builder /src/.next/standalone ./

# 2. public 폴더 복사 (images, fonts 등)
#    public 폴더를 사용한다면 이 줄이 필요합니다.
COPY --from=builder /src/public ./public

# 3. 브라우저가 요청할 static 에셋 복사 (가장 중요!)
#    이 부분이 없으면 GET ... .js 파일 요청에서 404 에러가 발생합니다.
COPY --from=builder /src/.next/static ./.next/static

EXPOSE 3000

# 프로덕션 서버 실행
# CMD ["npm", "start"]
CMD ["node", "server.js"]