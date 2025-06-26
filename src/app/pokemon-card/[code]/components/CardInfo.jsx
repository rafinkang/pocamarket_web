"use client";

import PokemonCard from "@/components/list/PokemonCard";
import RarityIcon from "@/components/icon/RarityIcon";
import ElementIcon from "@/components/icon/ElementIcon";

import {
  getPokemonElementName,
  getPokemonPackSetName,
  getPokemonPackName,
  COLORLESS,
} from "@/constants/pokemon";

// 스타일 객체를 사용하여 공통 클래스 관리
const styles = {
  // 페이지 구조
  pageTitle: "mb-4 text-2xl font-bold text-gray-800",
  container: "container mx-auto rounded-lg bg-gray-100 p-4 shadow-md",
  grid: "grid grid-cols-1 gap-6 md:grid-cols-2",

  // 왼쪽 카드 이미지 섹션
  imageWrapper: "flex justify-center",
  pokemonCard: "w-full max-w-[300px]",

  // 오른쪽 상세 정보 섹션
  detailsContainer: "rounded-lg bg-white p-4 shadow-inner",

  // 카드 이름 섹션
  cardNameSection: "mb-4",
  cardNameHeading: "mb-2 flex items-center justify-between",
  cardNameText: "text-2xl font-bold text-gray-800",

  // 공통 섹션 스타일
  section: "mb-4",
  sectionTitle: "mb-1 text-[1.1rem] font-semibold text-gray-700",
  infoBox: "mb-2 rounded-md bg-gray-50 p-3",

  // 기타 정보 섹션
  otherInfoList: "grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600",
  otherInfoItem: "flex items-center",
  otherInfoLabel: "w-[70px] shrink-0 font-medium text-black",
  otherInfoHpLabel: "w-[70px] shrink-0 font-medium text-[#0e376d]",
};

export default function CardInfo({ data, trade }) {
  const renderElementIcons = (cost) => {
    if (!cost) return null; // cost가 undefined인 경우 null 반환

    return cost.split(",").map((item, innerIdx) => (
      <ElementIcon
        key={`attack-icon-${innerIdx}`}
        element={item}
        className="mr-1 inline-block"
      />
    ));
  };

  return (
    <>
      <h1 className={styles.pageTitle}>카드 정보</h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 카드 이미지 */}
          <div className={styles.imageWrapper}>
            <PokemonCard
              data={data}
              showInfo={false}
              className={styles.pokemonCard}
            />
          </div>

          {/* 카드 상세 정보 */}
          <div className={styles.detailsContainer}>
            {/* 카드 이름 및 기본 정보 */}
            <div className={styles.cardNameSection}>
              <ElementIcon element={data.element} size="23" />
              <RarityIcon rarity={data.rarity} size="23" />
              <h1 className={styles.cardNameHeading}>
                <span className={styles.cardNameText}>
                  {data.nameKo} ({data.code})
                </span>
              </h1>
            </div>

            {/* 특성 */}
            {data.abilityList && data.abilityList.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>특성</h2>
                {data.abilityList.map((ability, idx) => (
                  <div key={`ability-${idx}`} className={styles.infoBox}>
                    <p className="font-medium text-gray-800">
                      {ability.nameKo}
                    </p>
                    <p className="text-gray-600">{ability.effectKo}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 스킬 */}
            {data.attackList && data.attackList.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>스킬</h2>
                {data.attackList.map((attack, idx) => (
                  <div key={`attack-${idx}`} className={styles.infoBox}>
                    <div className="flex items-center mb-1">
                      {renderElementIcons(attack.cost)}
                      <p className="ml-2 font-medium">{attack.nameKo}</p>
                    </div>
                    <p className="text-gray-600">
                      {attack.effectKo}{" "}
                      {attack.damage && `(데미지: ${attack.damage})`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 기타 정보 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>기타 정보</h2>
              <ul className={styles.otherInfoList}>
                <li className={styles.otherInfoItem}>
                  <span className={styles.otherInfoHpLabel}>HP</span>
                  {data.health}
                </li>
                <li className={styles.otherInfoItem}>
                  <span className={styles.otherInfoLabel}>약점</span>
                  <ElementIcon
                    element={data.weakness}
                    size="23"
                    className="mx-1"
                  />
                  {getPokemonElementName(data.weakness)}
                </li>
                <li className={styles.otherInfoItem}>
                  <span className={styles.otherInfoLabel}>후퇴비용</span>
                  <ElementIcon
                    element={COLORLESS}
                    loop={data.retreatCost}
                    size="23"
                    className="ml-1"
                  />
                </li>
                <li className={styles.otherInfoItem}>
                  <span className={styles.otherInfoLabel}>확장팩</span>
                  {getPokemonPackSetName(data.packSet)}
                </li>
                {data.pack && (
                  <li className={styles.otherInfoItem}>
                    <span className={styles.otherInfoLabel}>팩</span>
                    {getPokemonPackName(data.pack)}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
