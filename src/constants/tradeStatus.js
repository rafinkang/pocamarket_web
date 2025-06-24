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

export const getTradeRequestMapping = (statusCode) => {
  switch (statusCode) {
    case 0:
      return { text: status.DELETED, code: DELETED, num: 0 };
    case 1:
      return { text: status.REQUEST, code: REQUEST, num: 1 };
    case 2:
      return { text: status.PROCESS, code: PROCESS, num: 2 };
    case 3:
      return { text: status.COMPLETE, code: COMPLETE, num: 3 };
    default:
      return { text: "알 수 없음", code: "", num: -1 };
  }
}

export function getTradeStatusName(key) {
  return status[key];
}
