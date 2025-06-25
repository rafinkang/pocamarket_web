////////////////////////////////////// element
export const GRASS = "GRASS";
export const FIRE = "FIRE";
export const WATER = "WATER";
export const LIGHTNING =  "LIGHTNING";
export const PSYCHIC = "PSYCHIC";
export const FIGHTING =  "FIGHTING";
export const DARKNESS = "DARKNESS";
export const METAL =  "METAL";
export const DRAGON = "DRAGON";
export const COLORLESS =  "COLORLESS";

const pokemonElement = Object.freeze({
  [COLORLESS]: "노말",
  [FIRE]: "불꽃",
  [GRASS]: "풀",
  [WATER]: "물",
  [LIGHTNING]: "전기",
  [FIGHTING]: "격투",
  [PSYCHIC]: "초",
  [DARKNESS]: "악",
  [METAL]: "강철",
  [DRAGON]: "드래곤",
})

const COLORLESS_SRC = "/images/element/colorless.webp"
const FIRE_SRC = "/images/element/fire.webp"
const GRASS_SRC = "/images/element/grass.webp"
const WATER_SRC = "/images/element/water.webp"
const LIGHTNING_SRC = "/images/element/lightining.webp"
const FIGHTING_SRC = "/images/element/fighting.webp"
const PSYCHIC_SRC = "/images/element/psychic.webp"
const DARKNESS_SRC = "/images/element/darkness.webp"
const METAL_SRC = "/images/element/metal.webp"
const DRAGON_SRC = "/images/element/dragon.webp"

export const POKEMON_ELEMENT_CONFIG = Object.freeze({
  [COLORLESS]: {src: COLORLESS_SRC, count: 1},
  [FIRE]: {src: FIRE_SRC, count: 1},
  [GRASS]: {src: GRASS_SRC, count: 1},
  [WATER]: {src: WATER_SRC, count: 1},
  [LIGHTNING]: {src: LIGHTNING_SRC, count: 1},
  [FIGHTING]: {src: FIGHTING_SRC, count: 1},
  [PSYCHIC]: {src: PSYCHIC_SRC, count: 1},
  [DARKNESS]: {src: DARKNESS_SRC, count: 1},
  [METAL]: {src: METAL_SRC, count: 1},
  [DRAGON]: {src: DRAGON_SRC, count: 1},
})

export function getPokemonElementName(key) {
  return pokemonElement[key];
}

////////////////////////////////////// type
export const POKEMON = "POKEMON";
export const TRAINER = "TRAINER";

const pokemonType = Object.freeze({
  [POKEMON]: "포켓몬",
  [TRAINER]: "트레이너",
})

export function getPokemonTypeName(key) {
  return pokemonType[key];
}

////////////////////////////////////// subType
export const BASIC = "BASIC";
export const STAGE_1 = "STAGE_1";
export const STAGE_2 = "STAGE_2";
export const ITEM = "ITEM";
export const SUPPORTER = "SUPPORTER";
export const TOOL = "TOOL";

const pokemonSubType = Object.freeze({
  [BASIC]: "기본",
  [STAGE_1]: "1진화",
  [STAGE_2]: "2진화",
  [ITEM]: "아이템",
  [SUPPORTER]: "서포터",
  [TOOL]: "포켓몬 도구",
})

export function getPokemonSubTypeName(key) {
  return pokemonSubType[key];
}

////////////////////////////////////// packSet
export const A1 = "Genetic Apex (A1)";
export const A = "Promo-A";
export const A1a = "Mythical Island (A1a)";
export const A2 = "Space-Time Smackdown (A2)";

const pokemonPackSet = Object.freeze({
  [A1]: "최강의유전자",
  [A]: "프로모A",
  [A1a]: "환상이있는섬",
  [A2]: "시공의격투",
})

export function getPokemonPackSetName(key) {
  return pokemonPackSet[key];
}

////////////////////////////////////// pack
export const PIKACHU = "Pikachu";
export const CHARIZARD = "Charizard";
export const MEWTWO = "Mewtwo";
export const MEW = "Mew";
export const DIALGA = "Dialga";
export const PALKIA = "Palkia";

const pokemonPack = Object.freeze({
  [PIKACHU]: "피카츄",
  [CHARIZARD]: "리자몽",
  [MEWTWO]: "뮤츠",
  [MEW]: "뮤",
  [DIALGA]: "디아루가",
  [PALKIA]: "펄기아",
})

export function getPokemonPackName(key) {
  return pokemonPack[key];
}

////////////////////////////////////// rarity
export const COMMON = "COMMON";
export const UNCOMMON = "UNCOMMON";
export const RARE = "RARE";
export const RARE_EX = "RARE EX";
export const FULL_ART = "FULL ART";
export const FULL_ART_EX_SUPPORT = "FULL ART EX/SUPPORT";
export const IMMERSIVE = "IMMERSIVE";
export const GOLD_CROWN = "GOLD CROWN";

const DIA_SRC = "/images/rarity/dia.webp"
const STAR_SRC = "/images/rarity/star.webp"
const CROWN_SRC = "/images/rarity/crown.webp"

export const POKEMON_RARITY_CONFIG = Object.freeze({
  [COMMON]: { src: DIA_SRC, count: 1 },
  [UNCOMMON]: { src: DIA_SRC, count: 2 },
  [RARE]: { src: DIA_SRC, count: 3 },
  [RARE_EX]: { src: DIA_SRC, count: 4 },
  [FULL_ART]: { src: STAR_SRC, count: 1 },
  [FULL_ART_EX_SUPPORT]: { src: STAR_SRC, count: 2 },
  [IMMERSIVE]: { src: STAR_SRC, count: 3 },
  [GOLD_CROWN]: { src: CROWN_SRC, count: 1 },
})