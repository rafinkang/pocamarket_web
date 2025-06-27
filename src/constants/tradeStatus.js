const status = Object.freeze({
  0: "교환 삭제",
  1: "교환 등록",
  2: "교환 선택중",
  3: "교환 진행중",
  4: "교환 완료"
})

export const DELETED = 0;
export const REQUEST = 1;
export const SELECT = 2;
export const PROCESS = 3;
export const COMPLETE = 4;

export function getTradeStatusName(key) {
  return status[key];
}
