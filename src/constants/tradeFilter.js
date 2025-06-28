export const defaultCard = Object.freeze({ code: null, name: null, type: null });

export const getMyCardDefault = () => {
  return { ...defaultCard, filterCardType: "my" };
}

export const getWantCardDefault = () => {
  return [
    { ...defaultCard, filterCardType: "want-0" },
    { ...defaultCard, filterCardType: "want-1" },
    { ...defaultCard, filterCardType: "want-2" },
  ]
}

export const defaultFilterOptionList = Object.freeze([
  // { value: 0, name: "요청 삭제" },
  { value: 99, name: "전체 보기" },
  { value: 1, name: "요청 등록" },
  { value: 2, name: "요청 선택중" },
  { value: 3, name: "요청 진행중" },
  { value: 4, name: "요청 완료" }
]);

export const defaultSort = "sortedAt,desc";
export const defaultSortList = Object.freeze([
  { value: "sortedAt,desc", name: "최신순" },
  { value: "sortedAt,asc", name: "오래된순" },
]);
