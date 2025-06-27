import callApi from "@/lib/callApi";

/**
 * TCG 코드 등록
 * @param {object} [data] - { tcgCodeId: '', tcgCode: '', memo: '' }
 */
export const postTcgCode = async (data) => {
  return callApi({
    method: 'POST',
    url: '/tcg-code',
    data,
  });
};

export const getTcgCodeList = async () => {
  return callApi({
    method: 'GET',
    url: '/tcg-code',
  });
};

export const updateTcgCode = async (data) => {
  return callApi({
    method: 'PUT',
    url: `/tcg-code/${data.tcgCodeId}`,
    data,
  });
};

export const deleteTcgCode = async (tcgCodeId) => {
  return callApi({
    method: 'DELETE',
    url: `/tcg-code/${tcgCodeId}`,
  });
};

export const getTradeRequestTcgCode = async (tradeId, tradeRequestId) => {
  return callApi({
    method: 'GET',
    url: `/tcg-code/${tradeId}/${tradeRequestId}`,
  });
};