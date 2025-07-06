/**
 * 포켓몬 카드 상세 정보를 표시하는 공통 컴포넌트
 */

"use client"

import PokemonCard from "@/components/card/PokemonCard"
import ElementIcon from "@/components/icon/ElementIcon"
import RarityIcon from "@/components/icon/RarityIcon"
import { COLORLESS, getPokemonElementName, getPokemonPackSetName, getPokemonPackName } from "@/constants/pokemon"
import { getGradientClass } from "@/constants/gradients"

const testMode = process.env.NODE_ENV === "development";

// 스타일 객체
const styles = {
  // 페이지 구조
  container: "container mx-auto rounded-lg shadow-md overflow-hidden",
  grid: "grid grid-cols-1 md:grid-cols-2",

  // 왼쪽 카드 이미지 섹션
  imageWrapper: "flex items-center justify-center w-full h-full relative overflow-hidden after:content-[''] after:absolute after:right-[-20%] after:bottom-[-20%] after:w-[500px] after:h-[500px] after:bg-[url('/images/pokeball-pattern.svg')] after:bg-no-repeat after:bg-center after:bg-contain after:-rotate-45 after:opacity-100 after:pointer-events-none after:z-0 p-4",
  cardImage: "w-[280px] sm:w-[320px] md:w-[280px] lg:w-[320px] aspect-[366/512] z-[1] mx-auto",

  // 오른쪽 상세 정보 섹션
  detailsContainer: `
    bg-white relative
    before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 sm:before:h-2 
    before:bg-[var(--element-color)]
    sm:before:w-[85%] sm:before:right-0 sm:before:left-auto
    sm:before:[clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)]
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 sm:after:h-2
    after:bg-[var(--element-color)]
    sm:after:w-[85%] sm:after:right-auto
    sm:after:[clip-path:polygon(0_0,92%_0,100%_100%,0_100%)]
  `,
  contentArea: "p-4",

  // 컨텐츠 스타일
  iconContainer: "mb-4 flex items-center gap-1 relative z-[1]",
  cardOwner: "text-xl font-bold text-gray-800 relative z-[1]",

  // 공통 섹션 스타일
  section: "bg-white/90 p-4 relative z-[1] border-t border-gray-200",
  sectionWithMargin: "mb-4 bg-white/90 p-4 relative z-[1] border-t border-gray-200",
  sectionTitle: "mb-4 text-[1.1rem] font-semibold text-gray-700",

  // 정보 리스트 스타일
  infoList: "space-y-3 relative z-[1]",
  infoItem: "flex items-center gap-2 text-sm",
  infoLabel: "w-24 shrink-0 font-medium text-gray-600",
  infoValue: "text-gray-800 flex items-center gap-1",

  // 스킬 정보 스타일
  skillContainer: "space-y-2",
  skillHeader: "flex items-center gap-2",
  skillName: "text-base font-medium text-gray-800",
  skillCost: "flex items-center",
  skillDamage: "text-sm text-gray-600 ml-auto font-bold",
  skillEffect: "text-sm text-gray-600",

  // 속성별 색상 CSS 변수
  root: `
    [--grass-color:theme(colors.green.200)]
    [--fire-color:theme(colors.rose.200)]
    [--water-color:theme(colors.sky.200)]
    [--lightning-color:theme(colors.amber.200)]
    [--fighting-color:theme(colors.orange.200)]
    [--psychic-color:theme(colors.fuchsia.200)]
    [--colorless-color:theme(colors.slate.200)]
    [--darkness-color:theme(colors.slate.300)]
    [--metal-color:theme(colors.zinc.300)]
    [--dragon-color:theme(colors.indigo.200)]
    [--dark-color:theme(colors.neutral.300)]
    [--fairy-color:theme(colors.pink.200)]
  `,
}

/**
 * 카드 정보 아이템을 렌더링하는 컴포넌트
 */
const InfoItem = ({ label, children }) => (
  <li className={styles.infoItem}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{children}</span>
  </li>
)

/**
 * 스킬 컨테이너를 렌더링하는 컴포넌트
 */
const SkillContainer = ({ title, items, renderItem }) => (
  items?.length > 0 && (
    <div className={styles.sectionWithMargin}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.infoList}>
        {items.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  )
)

/**
 * 속성 아이콘을 렌더링하는 함수
 */
const renderElementIcons = (cost) => {
  if (!cost) return null
  return cost.split(",").map((item, idx) => (
    <ElementIcon
      key={`attack-icon-${idx}`}
      element={item}
      className="mr-1 inline-block"
    />
  ))
}

/**
 * 포켓몬 카드 상세 정보 컴포넌트
 */
export default function PokemonCardDetail({ 
  data,
  className = "",
  showCardCode = false,
  customImageWrapper,
  customDetailsContainer
}) {
  if (!data) return null

  const gradientClass = getGradientClass(data.element)

  return (
    <div className={`${styles.container} ${styles.root} ${className}`}>
      <div className={styles.grid}>
        {/* 왼쪽: 카드 이미지*/}
        <div className={customImageWrapper || `${styles.imageWrapper} ${gradientClass}`}>
          <div className={styles.cardImage}>
            <PokemonCard 
              data={data} 
              showInfo={false} 
              className="w-full h-full !bg-transparent" 
              testMode={testMode}
            />
          </div>
        </div>

        {/* 오른쪽: 이름과 상세 정보 */}
        <div 
          className={customDetailsContainer || styles.detailsContainer}
          style={{
            '--element-color': data.element ? 
              `var(--${data.element.toLowerCase()}-color, var(--colorless-color))` : 
              'var(--colorless-color)'
          }}
        >
          {/* 컨텐츠 영역 */}
          <div className={styles.contentArea}>
            <div className={styles.iconContainer}>
              <div className={styles.cardOwner}>
                {data.nameKo}
                {showCardCode && ` (${data.code})`}
              </div>
              <ElementIcon 
                element={data.element} 
                size="24" 
              />
              <RarityIcon 
                rarity={data.rarity} 
                size="24" 
              />
            </div>

            {/* 특성 정보 */}
            <SkillContainer
              title="특성"
              items={data.abilityList}
              renderItem={(ability, idx) => (
                <div key={idx} className={styles.skillContainer}>
                  <h4 className={styles.skillName}>{ability.nameKo}</h4>
                  <p className={styles.skillEffect}>{ability.effectKo}</p>
                </div>
              )}
            />

            {/* 스킬 정보 */}
            <SkillContainer
              title="스킬"
              items={data.attackList}
              renderItem={(attack, idx) => (
                <div key={idx} className={styles.skillContainer}>
                  <div className={styles.skillHeader}>
                    <div className={styles.skillCost}>
                      {renderElementIcons(attack.cost)}
                    </div>
                    <h4 className={styles.skillName}>{attack.nameKo}</h4>
                    <span className={styles.skillDamage}>{attack.damage}</span>
                  </div>
                  {attack.effectKo && (
                    <p className={styles.skillEffect}>{attack.effectKo}</p>
                  )}
                </div>
              )}
            />

            {/* 기타 정보 */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>기타 정보</h3>
              <ul className={styles.infoList}>
                <InfoItem label="HP">
                  {data.health}
                </InfoItem>
                <InfoItem label="후퇴비용">
                  <ElementIcon
                    element={COLORLESS}
                    loop={data.retreatCost}
                    size="23"
                    className="ml-1"
                  />
                </InfoItem>
                <InfoItem label="약점">
                  <ElementIcon
                    element={data.weakness}
                    size="23"
                    className="mx-1"
                  />
                  {getPokemonElementName(data.weakness)}
                </InfoItem>
                <InfoItem label="확장팩">
                  {getPokemonPackSetName(data.packSet)}
                </InfoItem>
                {data.pack && (
                  <InfoItem label="팩">
                    {getPokemonPackName(data.pack)}
                  </InfoItem>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 