const status = Object.freeze({
    REGISTRATION: "교환 등록",
    DELETED: "교환 삭제",
    REQUEST: "교환 요청",
    SELECT: "교환 선택",
    PROCESS: "교환 진행중",
    COMPLETE: "교환 완료"
})

export const REGISTRATION = "REGISTRATION";
export const DELETED = "DELETED";
export const REQUEST = "REQUEST";
export const SELECT = "SELECT";
export const PROCESS = "PROCESS";
export const COMPLETE = "COMPLETE";

export function getTradeStatusName (key) {
  return status[key];
}
