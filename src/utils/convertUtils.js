import { packSet } from "@/constants/pokemonCardFilter";

/**
 * 괄호 안의 값을 추출하여 packSet에서 해당하는 이름을 반환하는 함수
 * @param {string} text - "testest (A1)" 형태의 문자열
 * @returns {string} - 해당하는 packSet의 name 값, 없으면 "알 수 없음"
 */
export const getPackSetNameByText = (text) => {
  if (!text || typeof text !== 'string') {
    return "알 수 없음";
  }

  // 괄호 안의 값을 정규식으로 추출 (마지막 괄호를 우선으로)
  const match = text.match(/\(([^)]+)\)[^)]*$/);

  if (!match || !match[1]) {
    return "알 수 없음";
  }

  const extractedValue = match[1].trim();

  // packSet에서 정확히 일치하는 value를 찾기
  const foundPack = packSet.find(pack => pack.value === extractedValue);

  return foundPack ? foundPack.name : "알 수 없음";
};
