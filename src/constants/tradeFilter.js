const defaultCardInfo = Object.freeze({ code: null, name: null, type: null });
export const defaultFilterCardList = Object.freeze([
  { ...defaultCardInfo, filterCardType: "my" },
  { ...defaultCardInfo, filterCardType: "want-0" },
  { ...defaultCardInfo, filterCardType: "want-1" },
  { ...defaultCardInfo, filterCardType: "want-2" },
]);

export const defaultFilterOptionList = Object.freeze([
  { value: "all", name: "전체 보기" },

  { value: "request", name: "신청한 교환" },
  { value: "progress", name: "진행 중인 교환" },
  { value: "complete", name: "완료된 교환" },

  { value: "my-all", name: "내 교환 전체 보기", type: "my" },

  { value: "my-request", name: "내가 신청한 교환", type: "my" },
  { value: "my-progress", name: "내 진행 중인 교환", type: "my" },
  { value: "my-complete", name: "내 완료된 교환", type: "my" },
]);

export const defaultSort = "sortedAt,desc";
export const defaultSortList = Object.freeze([
  { value: "sortedAt,desc", name: "최신순" },
  { value: "sortedAt,asc", name: "오래된순" },
]);
