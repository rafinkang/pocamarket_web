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

export const statusColorMap = {
  [DELETED]: "#fb2c36",   // 삭제(레드)
  [REQUEST]: "#ad46ff",   // 요청(보라)
  [SELECT]: "#1e3a8a",   // 선택(남색)
  [PROCESS]: "#2b7fff",   // 진행(파랑)
  [COMPLETE]: "#059669",  // 완료(초록)
}

export const getStatusColor = (status) => {
  return statusColorMap[status];
}

export function getTradeStatusName(key) {
  return status[key];
}