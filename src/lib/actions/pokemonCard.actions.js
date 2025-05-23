'use server'; // 이 파일의 모든 함수는 서버 액션으로 작동

import prisma from '../prisma'; // 설정해둔 prisma 클라이언트 가져오기

/**
 * 새 게시물을 생성하는 함수
 * @param {object} postData - { title, content } 형태의 객체
 * @returns 생성된 게시물 객체
 */
export async function createPokemonCard(postData) {
  // 여기서 유효성 검사 등을 수행할 수 있습니다.
  const { 
        code,
        name,
        name_ko,
        element,
        type,
        subtype,
        health,
        pack_set,
        pack,
        retreat_cost,
        weakness,
        evolves_from,
        rarity } = postData;

  try {
    const newPost = await prisma.pokemon_card.create({
      data: {
        code,
        name,
        name_ko,
        element,
        type,
        subtype,
        health,
        pack_set,
        pack,
        retreat_cost,
        weakness,
        evolves_from,
        rarity
      },
    });
    return newPost;
  } catch (error) {
    // 실제 프로덕션에서는 더 정교한 에러 로깅/처리가 필요
    console.error('Database Error:', error);
    throw new Error('Failed to create post.');
  }
}