import callApi from "@/lib/callApi";

/**
 * TCG 교환글 등록
 * @param {object} [data] - { myCardCode: '', wantCardCode: '', tcgCode: '' }
 */
export const postTcgTrade = async (data) => {
  return callApi({
    method: 'POST',
    url: '/tcg-trade',
    data,
  });
};

/**
 * TCG 교환글 수정
 * @param {Number} [tradeId]
 * @param {object} [data] - { myCardCode: '', wantCardCode: '', tcgCode: '' }
 */
export const putTcgTrade = async (tradeId, data) => {
  return callApi({
    method: 'PUT',
    url: `/tcg-trade/${tradeId}`,
    data,
  });
};

/**
 * TCG 교환글 삭제
 * @param {Number} [tradeId]
 */
export const deleteTcgTrade = async (tradeId) => {
  return callApi({
    method: 'DELETE',
    url: `/tcg-trade/${tradeId}`,
  });
};

/**
 * TCG 교환 목록 조회
 */
export const getTcgTradeList = async (params) => {
  return callApi({
    method: "GET",
    url: "/tcg-trade",
    params,
  });
};


/**
 * 내 TCG 교환 목록 조회
 */
export const getMyTcgTradeList = async (params) => {
  return callApi({
    method: "GET",
    url: "/tcg-trade/my",
    params,
  });
};

/**
 * 내 TCG 교환 목록 조회
 */
export const getMyTcgTradeInfo = async () => {
  return callApi({
    method: "GET",
    url: "/tcg-trade/my/info",
  });
};


/**
 * 교환 상세 조회
 * @param {Number} [tradeId]
 */
export const getTcgTradeDetail = async (tradeId) => {
  return callApi({
    method: "GET",
    url: `/tcg-trade/${tradeId}`,
  });
};

/**
 * TCG 교환 최신화
 */
export const patchTcgTradeRefresh = async (tradeId, data) => {
  return callApi({
    method: "PATCH",
    url: `/tcg-trade/refresh/${tradeId}`,
    data,
  });
}