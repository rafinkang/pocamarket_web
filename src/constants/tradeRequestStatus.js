const status = Object.freeze({
  0: "요청 삭제",
  1: "요청 등록",
  2: "요청 진행중",
  3: "요청 완료"
})

export const REQUEST_DELETED = 0;
export const REQUEST_SUBMITTED = 1;
export const REQUEST_PROCESS = 2;
export const REQUEST_COMPLETE = 3;

export function getTradeRequestStatusName(key) {
  return status[key];
}
