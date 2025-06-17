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