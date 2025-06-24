const status = Object.freeze({
    0: "신고 접수",
    1: "처리 완료",
    2: "처리 보류",
})

export const RECEIVED = 0;
export const COMPLETE = 1;
export const PENDING = 2;

export function getTradeStatusName(key) {
  return status[key];
}
