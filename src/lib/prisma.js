import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// globalThis 객체에 prisma가 없으면 새로 생성해서 할당
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// 개발 환경에서는 globalThis에 prisma 인스턴스를 저장하여
// 코드가 변경될 때마다 새 연결이 생성되는 것을 방지
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}