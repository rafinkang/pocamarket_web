import callApi from "@/lib/callApi";

/**
 * TCG 교환 등록
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
 * 교환 상세 조회
 * @param {Number} [tradeId]
 */
export const getTcgTradeDetail = async (tradeId) => {
  return callApi({
    method: "GET",
    url: `/tcg-trade/${tradeId}`,
  });
};