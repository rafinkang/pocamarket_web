FROM node:22-alpine AS builder
WORKDIR /src

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run build

# 프로덕션 이미지
FROM node:22-alpine AS runner
WORKDIR /src

# 빌드 환경에서 생성된 결과물만 복사
COPY --from=builder /src/public ./public
COPY --from=builder /src/.next ./.next
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json

EXPOSE 3000
CMD ["node", "server.js"]