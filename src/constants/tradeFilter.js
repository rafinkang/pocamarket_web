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

const statusList = Object.freeze([
  { value: "1", name: "교환 요청 중" },
  { value: "2", name: "진행 중인 교환" },
  { value: "3", name: "완료된 교환" },
]);

export const defaultSort = "updatedAt,desc";
export const defaultSortList = Object.freeze([
  { value: "updatedAt,desc", name: "최신순" },
  { value: "updatedAt,asc", name: "오래된순" },
]);

/**
 * 유틸 메서드
 */
export const convertStatus = (status) => {
  return statusList.find((option) => option.value == status)?.name ?? "잘못된 상태 값입니다.";
};