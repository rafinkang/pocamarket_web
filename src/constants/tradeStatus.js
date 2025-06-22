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

export const getTradeRequestMapping = (statusCode) => {
  switch (statusCode) {
    case 0:
      return { text: status.DELETED, code: DELETED };
    case 1:
      return { text: status.REQUEST, code: REQUEST };
    case 2:
      return { text: status.PROCESS, code: PROCESS };
    case 3:
      return { text: status.COMPLETE, code: COMPLETE };
    default:
      return { text: "알 수 없음", code: "" };
  }
}

export function getTradeStatusName(key) {
  return status[key];
}
