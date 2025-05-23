const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('데이터 시딩을 시작...');

    // const filePath = path.join(process.cwd(), 'prisma', 'data', 'a1-genetic-apex.json');
    const filePath = path.join(process.cwd(), 'prisma', 'data', 'a1a-mythical-island.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    console.log(`${jsonData.length}개의 카드 데이터에 대한 시딩을 시작합니다...`);

    // JSON 파일의 각 카드 데이터에 대해 루프 실행
    for (const item of jsonData) {
        try {
            // 각 카드별로 원자성을 보장하기 위해 트랜잭션 사용
            await prisma.$transaction(async (tx) => {
                // 1. pokemon_card 데이터 준비 (JSON 키와 DB 컬럼명 매핑)
                const cardData = {
                    code: item.code,
                    name: item.name,
                    name_ko: item.name_ko,
                    element: item.element,
                    type: item.type,
                    subtype: item.subtype,
                    health: item.health,
                    pack_set: item.set, // 'set' -> 'pack_set'
                    pack: item.pack,
                    retreat_cost: Number(item.retreatCost), // 'retreatCost' -> 'retreat_cost'
                    weakness: item.weakness,
                    evolves_from: item.evolvesFrom,
                    rarity: item.rarity,
                };

                // 2. pokemon_card 테이블에 upsert 실행
                await tx.pokemon_card.upsert({
                    where: { code: item.code },
                    update: cardData,
                    create: cardData,
                });

                // 3. 이 카드의 기존 attack, ability 데이터를 모두 삭제 (업데이트를 위해)
                await tx.pokemon_attack.deleteMany({
                    where: { card_code: item.code },
                });
                await tx.pokemon_ability.deleteMany({
                    where: { card_code: item.code },
                });

                // 4. 새로운 attack 데이터 준비 및 삽입 (데이터가 있을 경우에만)
                if (item.attacks && item.attacks.length > 0) {
                    const attacksData = item.attacks.map(attack => ({
                        card_code: item.code, // 외래 키(FK)로 현재 카드 코드를 삽입
                        name: attack.name,
                        name_ko: attack.name_ko,
                        damage: attack.damage,
                        cost: Array.isArray(attack.cost) ? attack.cost.join(', ') : '', // 배열을 문자열로 변환
                    }));
                    await tx.pokemon_attack.createMany({
                        data: attacksData,
                    });
                }

                // 5. 새로운 ability 데이터 준비 및 삽입 (데이터가 있을 경우에만)
                if (item.abilities && item.abilities.length > 0) {
                    const abilitiesData = item.abilities.map(ability => ({
                        card_code: item.code, // 외래 키(FK)로 현재 카드 코드를 삽입
                        name: ability.name,
                        name_ko: ability.name_ko,
                        effect: ability.effect,
                        effect_ko: ability.effect_ko,
                    }));
                    await tx.pokemon_ability.createMany({
                        data: abilitiesData,
                    });
                }
            });
            console.log(`- 카드 "${item.code}" 데이터가 성공적으로 처리되었습니다.`);

        } catch (error) {
            console.error(`- 카드 "${item.code}" 처리 중 에러 발생:`, error);
            // 전체를 롤백하는 것이 아니므로, 에러가 난 카드만 건너뛰고 계속 진행할 수 있음
            // 만약 하나의 카드라도 실패 시 전체를 중단하고 싶다면 process.exit(1)을 호출
        }
    }
}

main()
  .then(() => {
    console.log('데이터 시딩이 완료되었습니다.');
  })
  .catch((e) => {
    console.error('시딩 스크립트 실행 중 최종 에러 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });