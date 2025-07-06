/**
 * 타입별 그라데이션 스타일 매핑
 */
export const TYPE_GRADIENTS = {
  grass: "bg-gradient-to-tr from-green-25 via-green-50 to-green-100",
  fire: "bg-gradient-to-tr from-red-25 via-red-50 to-red-100",
  water: "bg-gradient-to-tr from-blue-25 via-blue-50 to-blue-100",
  lightning: "bg-gradient-to-tr from-yellow-25 via-yellow-50 to-yellow-100",
  fighting: "bg-gradient-to-tr from-orange-25 via-orange-50 to-orange-100",
  psychic: "bg-gradient-to-tr from-purple-25 via-purple-50 to-purple-100",
  colorless: "bg-gradient-to-tr from-gray-25 via-gray-50 to-gray-100",
  darkness: "bg-gradient-to-tr from-slate-25 via-slate-50 to-slate-100",
  metal: "bg-gradient-to-tr from-zinc-25 via-zinc-50 to-zinc-100",
  dragon: "bg-gradient-to-tr from-violet-25 via-violet-50 to-violet-100",
  dark: "bg-gradient-to-tr from-zinc-25 via-zinc-50 to-zinc-100",
  fairy: "bg-gradient-to-tr from-pink-25 via-pink-50 to-pink-100"
}

/**
 * 타입에 따른 그라데이션 클래스를 반환하는 함수
 */
export function getGradientClass(type) {
  if (!type) return TYPE_GRADIENTS.colorless
  return TYPE_GRADIENTS[type.toLowerCase()] || TYPE_GRADIENTS.colorless
} 